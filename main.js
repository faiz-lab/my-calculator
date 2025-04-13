var values_input = {
    previous_data: ['0'],
    current_data: [0],
}
var operations_button = document.querySelectorAll('[data-operation]')
var numbers_button = document.querySelectorAll('[data-number]')
var current_operand = document.querySelector('.current-operand')
var previous_operand = document.querySelector('.previous-operand')
var del_button = document.querySelector('[data-delete]')
var all_clear_button = document.querySelector('[data-all-clear]')
var equals_button = document.querySelector('[data-equals]')

operations_button.forEach(function (item) {
    item.addEventListener('click', InputOperator)
})
numbers_button.forEach(function (item) {
    item.addEventListener('click', InputNumber)
})
del_button.addEventListener('click', Delete)
all_clear_button.addEventListener('click', AllClear)
equals_button.addEventListener('click', Calculate)

function InputOperator(event) {
    var symbol = event.target.textContent
    if (symbol === '×') {
        symbol = '*'
    }
    if (symbol === '÷') {
        symbol = '/'
    }
    if (typeof values_input.current_data[0] === 'number') {
        //NOTE: 把数组中的每一个元素都转换成了字符串类型
        values_input.current_data = values_input.current_data.map(String)
    }
    values_input.current_data.push(symbol)
    RenderCurrentOperand(values_input.current_data.join(''))
    RenderPreviousOperand(values_input.previous_data.join(''))
}

function InputNumber(event) {
    var symbol = event.target.textContent
    var result = values_input.current_data[0]
    if (
        typeof result === 'number' ||
        result?.includes('e') ||
        isFloat(Number(result))
    ) {
        values_input.current_data = []
    }
    values_input.current_data.push(symbol)
    RenderCurrentOperand(values_input.current_data.join(''))
    RenderPreviousOperand(values_input.previous_data.join(''))
}

function Delete() {
    values_input.current_data.pop()
    RenderCurrentOperand(values_input.current_data.join(''))
    RenderPreviousOperand(values_input.previous_data.join(''))
}

function AllClear() {
    values_input.current_data = ['0']
    values_input.previous_data = ['0']
    RenderCurrentOperand(values_input.current_data.join(''))
    RenderPreviousOperand(values_input.previous_data.join(''))
}

function Calculate() {
    var result_joined = values_input.current_data.join('')
    var result = Function('return ' + result_joined)()
    result = formatResult(result)
    values_input.previous_data = []
    previous_operand.textContent = `${current_operand.textContent} = `
    values_input.current_data = []
    values_input.previous_data.push(result)
    values_input.current_data.push(result)
    RenderCurrentOperand(values_input.current_data.join(''))
}

function RenderCurrentOperand(data) {
    data = data.replaceAll('*', ' × ')
    data = data.replaceAll('/', ' ÷ ')
    data = data.replaceAll(/(?<!e)\+/g, ' + ') //IMPORTANT: 仅仅当'+'前面不是'e'时匹配'+'，这被称为反向否定查找。
    data = data.replaceAll('-', ' - ')
    current_operand.textContent = data
}

function RenderPreviousOperand(data) {
    previous_operand.textContent = `Ans = ${data}`
}

function formatResult(result) {
    var max_output_number_length = 10
    var output_precision = 5
    if (digitCounter(result) > max_output_number_length) {
        if (isFloat(result)) {
            var result_int = parseInt(result)
            var result_int_length = digitCounter(result_int)
            if (result_int_length > max_output_number_length) {
                return result.toPrecision(output_precision)
            } else {
                var num_of_digits_after_point =
                    max_output_number_length - result_int_length
                return result.toPrecision(num_of_digits_after_point)
            }
        } else {
            return result.toPrecision(output_precision)
        }
    } else {
        return result
    }
}

function digitCounter(number) {
    return number.toString().length
}

function isFloat(number) {
    return number % 1 !== 0
}
