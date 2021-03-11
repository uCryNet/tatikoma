import React, {useContext, useState} from 'react'
import Display from '../Display/Display'
import NumPad from '../NumPad/NumPad'
import {Digit, Operator} from '../../ts/types'
import {ThemeContextValue} from "../Theme/ThemeProvider";
import {ThemeContext} from "../Theme/ThemeContext";

interface Rez {
    amount: number
    current: boolean
}

export const App: React.FC = () => {
    const [memory, setMemory] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [display, setDisplay] = useState<string>('0')
    const [isOperand, setIsOperand] = useState<boolean>(true)
    const [isOperator, setIsOperator] = useState<Operator>()
    const {isDarkTheme} = useContext<ThemeContextValue>(ThemeContext);

    const onMemorySaveResult = ():void => {
        const newResult: number = Number(display)
        const history: string = localStorage.getItem("rez") as string

        if (history) {
            const oldArr: Rez[] = JSON.parse(localStorage.getItem("rez") as string)
            oldArr.forEach(e => e.current = false)

            const newRez: Rez = {
                amount: newResult,
                current: true
            }

            oldArr.push(newRez)
            localStorage.setItem("rez", JSON.stringify(oldArr));
        } else {
            const tempArr: Rez[] = [{
                amount: newResult,
                current: true
            }]
            localStorage.setItem("rez", JSON.stringify(tempArr));
        }
    }

    const calc = (rightOperand: number, isOperator: Operator):boolean => {
        let newResult = result

        switch (isOperator) {
            case '+':
                newResult += rightOperand
                break
            case '-':
                newResult -= rightOperand
                break
            case '×':
                newResult *= rightOperand
                break
            case '%':
                newResult = 100 / newResult * rightOperand
                break
            case '÷':
                if (rightOperand === 0) {
                    return false
                }

                newResult /= rightOperand
        }

        setResult(newResult)
        setDisplay(newResult.toString().toString().slice(0, 7))

        return true
    }

    const onDigitButtonClick = (digit: Digit):void => {
        let newValue = display

        if ((display === '0' && digit === 0) || display.length > 7) {
            return
        }

        if (isOperand) {
            newValue = ''
            setIsOperand(false)
        }

        if (display !== '0') {
            newValue = newValue + digit.toString()
        } else {
            newValue = digit.toString()
        }

        setDisplay(newValue)
    }

    const onDotButtonClick = ():void => {
        let newValue = display

        if (isOperand) newValue = '0'
        if (newValue.indexOf('.') === -1) newValue = newValue + '.'

        setDisplay(newValue)
        setIsOperand(false)
    }

    const onOperatorButtonClick = (operator: Operator):void => {
        const operand: number = Number(display)

        if (typeof isOperator !== 'undefined' && !isOperand) {
            if (!calc(operand, isOperator)) return
        } else {
            setResult(operand)
        }

        setIsOperator(operator)
        setIsOperand(true)
    }

    const onMinusSignButtonClick = ():void => {
        const value: number = Number(display);

        (value > 0)
            ? setDisplay('-' + display)
            : setDisplay(display.slice(1))
    }

    const onEqualButtonClick = ():void => {
        const operand: number = Number(display)

        if (typeof isOperator !== 'undefined' && !isOperand) {
            if (!calc(operand, isOperator)) return
            setIsOperator(undefined)
        } else {
            setDisplay(operand.toString())
        }

        setResult(operand)
        setIsOperand(true)
    }

    const onAllClearButtonClick = ():void => {
        setMemory(0)
        setResult(0)
        setIsOperator(undefined)
        setDisplay('0')
        setIsOperand(true)

        onMemoryClear()
    }

    const onMemoryClear = ():void => {
        localStorage.getItem('rez') && localStorage.removeItem('rez')
    }

    const onClearButtonClick = ():void => {
        setMemory(0)
        setResult(0)
        setIsOperator(undefined)
        setDisplay('0')
        setIsOperand(true)
    }

    const onClearEntryButtonClick = ():void => {
        setDisplay('0')
        setIsOperand(true)
    }

    const onMemoryRecallButtonClick = ():void => {
        setDisplay(memory.toString())
        setIsOperand(true)
    }

    const onMemoryInsertButtonClick = ():void => {
        const history: Rez[] = JSON.parse(localStorage.getItem("rez") as string)
        if (!history) return

        let idx: number = 0;
        let memory: Rez | undefined = history.find((e, i) => {
            if (e.current) {
                idx = i
                return e
            }
        })

        if (history[idx - 1]) {
            history[idx].current = false
            history[idx - 1].current = true
        } else {
            history[idx].current = false
            history[history.length - 1].current = true
        }

        localStorage.setItem("rez", JSON.stringify(history));
        setIsOperand(false)

        memory && setDisplay(memory.amount.toString())
    }

    return (
        <div className={'app ' + (isDarkTheme ? 'dark' : '')}>
            <Display value={display} expression={
                typeof isOperator !== 'undefined'
                    ? `${result}${isOperator}${isOperand
                    ? ''
                    : display}`
                    : ''
            }
            />
            <NumPad
                onDigitButtonClick={onDigitButtonClick}
                onDotButtonClick={onDotButtonClick}
                onOperatorButtonClick={onOperatorButtonClick}
                onMinusSignButtonClick={onMinusSignButtonClick}
                onEqualButtonClick={onEqualButtonClick}
                onAllClearButtonClick={onAllClearButtonClick}
                onClearButtonClick={onClearButtonClick}
                onClearEntryButtonClick={onClearEntryButtonClick}
                onMemoryRecallButtonClick={onMemoryRecallButtonClick}
                onMemoryInsertButtonClick={onMemoryInsertButtonClick}
                onMemorySaveResult={onMemorySaveResult}
                onMemoryClear={onMemoryClear}
            />
        </div>
    )
}

export default App
