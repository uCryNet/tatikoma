import React, {useContext, useEffect} from 'react'
import Button from '../Button/Button'
import {Digit, Operator} from '../../ts/types'
import {ThemeContextValue} from "../Theme/ThemeProvider";
import {ThemeContext} from "../Theme/ThemeContext";

interface NumPadProps {
    onDigitButtonClick: (digit: Digit) => void
    onDotButtonClick: () => void
    onOperatorButtonClick: (operator: Operator) => void
    onMinusSignButtonClick: () => void
    onEqualButtonClick: () => void
    onAllClearButtonClick: () => void
    onClearEntryButtonClick: () => void
    onMemoryInsertButtonClick: () => void
    onClearButtonClick: () => void
    onMemorySaveResult: () => void
    onMemoryClear: () => void
}

export const NumPad: React.FC<NumPadProps> = ({
                                               onDigitButtonClick,
                                               onDotButtonClick,
                                               onOperatorButtonClick,
                                               onMinusSignButtonClick,
                                               onEqualButtonClick,
                                               onAllClearButtonClick,
                                               onClearEntryButtonClick,
                                               onMemoryInsertButtonClick,
                                               onClearButtonClick,
                                               onMemorySaveResult,
                                               onMemoryClear
                                           }) => {
    const {theme, isDarkTheme} = useContext<ThemeContextValue>(ThemeContext)

    useEffect(() => {
        document.body.addEventListener('keydown', onHandleKey)
        return () => document.body.removeEventListener('keydown', onHandleKey)
    })

    const onHandleKey = ({keyCode, shiftKey}: KeyboardEvent):void => {
        if (keyCode >= 48 && keyCode <= 57 && !shiftKey) {
            // Цифры верхний ряд
            onDigitButtonClick((keyCode - 48) as Digit)
        } else if (keyCode === 53 && shiftKey) {
            onOperatorButtonClick('%')
        } else if (keyCode === 107 || (keyCode === 187 && shiftKey)) {
            onOperatorButtonClick('+')
        } else if (keyCode === 187 && !shiftKey) {
            onEqualButtonClick()
        } else if (keyCode === 106 || (keyCode === 56 && shiftKey)) {
            onOperatorButtonClick('×')
        } else if (keyCode === 109 || keyCode === 189) {
            onOperatorButtonClick('-')
        } else if (keyCode === 111 || keyCode === 191) {
            onOperatorButtonClick('÷')
        } else if (keyCode === 111 || keyCode === 191) {
            onOperatorButtonClick('÷')
        }  else if (keyCode === 68) {
            // D - точка
            onDotButtonClick()
        } else if (keyCode === 46) {
            // Delete - удалить ввод
            onClearEntryButtonClick()
        } else if (keyCode === 27) {
            // Esc - очистить ввод и историю
            onAllClearButtonClick()
        } else if (keyCode === 78) {
            // N - добавить/убрать минус впереди
            onMinusSignButtonClick()
        } else if (keyCode === 80) {
            // P - вставить сохр. знач.
            onMemoryInsertButtonClick()
        } else if (keyCode === 67) {
            // С - удалить ввод
            onClearButtonClick()
        } else if (keyCode === 65) {
            // A - удалить ввод и историю
            onAllClearButtonClick()
        } else if (keyCode === 83) {
            // S - сохр. историю
            onMemorySaveResult()
        } else if (keyCode === 75) {
            // K - удалить историю
            onMemoryClear()
        }
    }

    return (
        <div className={'pad'}>
            <Button clas={'button--grey'} onClick={onClearButtonClick}>
                C
            </Button>
            <Button clas={'button--grey'} onClick={onMemoryClear}>
                MC
            </Button>
            <Button clas={'button--grey'} onClick={onMemorySaveResult}>
                MS
            </Button>
            <Button clas={isDarkTheme ? 'button--red' : 'button--green'} onClick={theme}>
                T
            </Button>
            <Button clas={'button--grey'} onClick={onAllClearButtonClick}>
                AC
            </Button>
            <Button clas={'button--grey'} onClick={onMinusSignButtonClick}>
                -/+
            </Button>
            <Button clas={'button--grey'} onClick={() => onOperatorButtonClick('%')}>
                %
            </Button>
            <Button clas={'button--yellow'} onClick={() => onOperatorButtonClick('÷')}>
                ÷
            </Button>
            <Button onClick={() => onDigitButtonClick(7)}>
                7
            </Button>
            <Button onClick={() => onDigitButtonClick(8)}>
                8
            </Button>
            <Button onClick={() => onDigitButtonClick(9)}>
                9
            </Button>
            <Button clas={'button--yellow'} onClick={() => onOperatorButtonClick('×')}>
                ×
            </Button>
            <Button onClick={() => onDigitButtonClick(4)}>
                4
            </Button>
            <Button onClick={() => onDigitButtonClick(5)}>
                5
            </Button>
            <Button onClick={() => onDigitButtonClick(6)}>
                6
            </Button>
            <Button clas={'button--yellow'} onClick={() => onOperatorButtonClick('-')}>
                ‒
            </Button>
            <Button onClick={() => onDigitButtonClick(1)}>
                1
            </Button>
            <Button onClick={() => onDigitButtonClick(2)}>
                2
            </Button>
            <Button onClick={() => onDigitButtonClick(3)}>
                3
            </Button>
            <Button clas={'button--yellow'} onClick={() => onOperatorButtonClick('+')}>
                +
            </Button>
            <Button onClick={() => onDigitButtonClick(0)}>
                0
            </Button>
            <Button clas={'button--grey'} onClick={onMemoryInsertButtonClick}>
                MR
            </Button>
            <Button clas={'button--middle'} onClick={onDotButtonClick}>
                .
            </Button>
            <Button clas={'button--yellow'} onClick={onEqualButtonClick}>
                =
            </Button>
        </div>
    )
}

export default NumPad
