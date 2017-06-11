import {
  forwardRef,
  Directive,
  Provider,
  HostListener,
  Renderer,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as keycode from 'keycode';
import * as keyHandlers from './keyHandlers';
import * as helpers from './helpers';
import ValueHistory from './valueHistory';
import {
  ACTION_TYPES,
  DRAG_STATES,
  RANGE
} from './constants';

const FINPUT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FinputDirective),
  multi: true
};

@Directive({
  selector: '[finput]',
  providers: [FINPUT_VALUE_ACCESSOR]
})
export class FinputDirective implements ControlValueAccessor, OnInit, OnDestroy {

  private element: HTMLInputElement;
  private options = {
    scale: 2,
    range: RANGE.ALL,
    fixed: true,
    thousands: ',',
    decimal: '.',
    shortcuts: {
      'k': 1000,
      'm': 1000000,
      'b': 1000000000
    }
  };
  private _actionTypes = this.createActionTypes();
  private _history = new ValueHistory();

  _onTouched = () => {};
  _onChange = (_: any) => {};

  @HostListener('blur', ['$event'])
  onBlur(event) {
    console.debug('Blur event', event);
    this._onTouched();
  }

  @HostListener('focus', ['$event'])
  onFocus(event) {
    console.debug('Focus IN event', event);
    this.element.selectionStart = 0;
    this.element.selectionEnd = this.element.value.length;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    console.log('keydown', event);
    const keyInfo = {
      event,
      code: event.which || event.keyCode,
      keyName: keycode(event) ? keycode(event).replace('numpad ', '') : null,
      caretStart: this.element.selectionStart,
      caretEnd: this.element.selectionEnd,
      currentValue: this.element.value,
      newValue: this.element.value
    }

    const actionType = this.getActionType(keyInfo.keyName, event);

    console.debug(actionType);

    switch (actionType) {
      case ACTION_TYPES.NUMBER:
        keyHandlers.onNumber(keyInfo, this.options);
        break;
      case ACTION_TYPES.DECIMAL:
        keyHandlers.onDecimal(keyInfo, this.options);
        break;
      case ACTION_TYPES.MINUS:
        keyHandlers.onMinus(keyInfo, this.options);
        break;
      case ACTION_TYPES.SHORTCUT:
        keyHandlers.onShortcut(keyInfo, this.options);
        break;
      case ACTION_TYPES.HORIZONTAL_ARROW:
      case ACTION_TYPES.VERTICAL_ARROW:
      case ACTION_TYPES.HOME:
      case ACTION_TYPES.END:
        console.debug(actionType);
        // Default behaviour
        return;
      case ACTION_TYPES.BACKSPACE:
        keyHandlers.onBackspace(keyInfo, this.options.thousands);
        break;
      case ACTION_TYPES.DELETE:
        keyHandlers.onDelete(keyInfo, this.options.thousands);
        break;
      case ACTION_TYPES.UNDO:
        keyHandlers.onUndo(this, event);
        return;
      case ACTION_TYPES.REDO:
        keyHandlers.onRedo(this, event);
        return;
      default:
        // If ctrl key modifier is pressed then allow specific event handler
        // to handle this
        if (!event.ctrlKey) {
          event.preventDefault();
        }
        return;
    }

    const newValue = helpers.partialFormat(keyInfo.newValue, this.options);
    const currentValue = keyInfo.newValue;

    this.element.value = newValue;
    (this.element as any).rawValue = this.getRawValue(this.element.value);
    this._onChange(this.getRawValue(this.element.value));
    const offset = helpers.calculateOffset(
      currentValue,
      this.element.value,
      keyInfo.caretStart,
      this.options
    );
    const newCaretPos = keyInfo.caretStart + offset;
    this.element.setSelectionRange(newCaretPos, newCaretPos);
    this._history.addValue(newValue);
  }

  getActionType(name, e) {
    for (let actionType of this._actionTypes) {
      const index = actionType.names.indexOf(name);
      const typeMatch = index > -1;

      if (typeMatch && (actionType['ctrl'] ? e.ctrlKey : true)) {
        return actionType.type;
      }
    }
    return ACTION_TYPES.UNKNOWN;
  }

  @HostListener('input')
  onInput() {
    console.log('hello');
    console.log(this.element);
  }

  ngOnInit(): void {
    // this.setupFinput()
    if (this._elementRef.nativeElement.tagName === 'INPUT') {
      this.element = this._elementRef.nativeElement;
    }
  }

  ngOnDestroy(): void {
    // this.finput();
  }

  constructor(private renderer: Renderer, private _elementRef: ElementRef) {}

  writeValue(value: any): void {
    console.log('writing a new value to the input');
    console.log(value);
    const normalizedValue = helpers.partialFormat(value == null ? '' : value, this.options);
    this.renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
  }

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }

  registerOnTouched(fn: () => any): void { this._onTouched = fn; }

  setDisabledState(isDisabled: boolean) {
    this.renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  getRawValue(val) {
    return Number(this.element.value.replace(new RegExp(this.options.thousands, 'g'), ''));
  }

  createActionTypes() {
    return [
      {
        type: ACTION_TYPES.NUMBER,
        names: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      },
      {
        type: ACTION_TYPES.MINUS,
        names: ['-']
      },
      {
        type: ACTION_TYPES.HOME,
        names: ['home']
      },
      {
        type: ACTION_TYPES.END,
        names: ['end']
      },
      {
        type: ACTION_TYPES.DECIMAL,
        names: [this.options.decimal]
      },
      {
        type: ACTION_TYPES.DELIMITER,
        names: [this.options.thousands]
      },
      {
        type: ACTION_TYPES.SHORTCUT,
        names: Object.keys(this.options.shortcuts)
      },
      {
        type: ACTION_TYPES.BACKSPACE,
        names: ['backspace']
      },
      {
        type: ACTION_TYPES.DELETE,
        names: ['delete']
      },
      {
        type: ACTION_TYPES.HORIZONTAL_ARROW,
        names: ['left', 'right']
      },
      {
        type: ACTION_TYPES.VERTICAL_ARROW,
        names: ['up', 'down']
      },
      {
        type: ACTION_TYPES.UNDO,
        names: ['z'],
        ctrl: true
      },
      {
        type: ACTION_TYPES.REDO,
        names: ['y'],
        ctrl: true
      }
    ]
  }

}
