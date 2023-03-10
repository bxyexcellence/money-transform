const transMap = {
    0: '零',
    1: '壹',
    2: '贰',
    3: '叁',
    4: '肆',
    5: '伍',
    6: '陆',
    7: '柒',
    8: '捌',
    9: '玖'
}
const minStrMap = {
    0: '仟',
    1: '佰',
    2: '拾',
    3: '',
}
const baseMap = {
    0: '元',
    1: '万',
    2: '亿'
}
//输入: 10043470040

//输出: 壹佰亿零肆仟叁佰肆拾柒万零肆拾元整
//12
//1 2345 6789

//最小的单元 x千x百x十x
function getMinstr(arr) {
    const newArr = [...arr]
    while (newArr.length && newArr[newArr.length - 1] === '0') {
        newArr.pop()
    }
    if (!newArr.length) return ''
    let str = ''
    newArr.forEach((item, index) => {
        str += transMap[item]
        if (item !== '0') {
            str += minStrMap[index]
        }
    })
    return str
}
//主要函数
function convertCurrency(num) {
    // let num = 10043470040.1234
    const newnum = Math.floor(num)
    // console.log(newnum)
    const newArr = newnum.toString().split('')
    //超过千亿直接return
    if (newArr.length > 12) return

    //四位一分割
    const needArr = []
    let arr = []
    let index = 0
    while (newArr.length) {
        let target = newArr.pop()
        arr.unshift(target)
        index = index + 1
        if (index === 4) {
            needArr.push([...arr])
            index = 0
            arr = []
        }
    }
    if (arr.length) {
        needArr.push(arr)
    }
    let str = '整'
    //主要函数
    needArr.forEach((item, index) => {
        str = getMinstr(item) + baseMap[index] + str
    })
    return str.replace(/(零零)/g, '零')
}
console.log(convertCurrency('10043470040'));