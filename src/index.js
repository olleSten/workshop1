const fs = require('fs/promises')

const readCode = async (path) => {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' });
    return data
  } catch (err) {
    console.log(err);
  }
}

function linesOfCode(string) {
  const lines = string.split('\n')
  const notEmpty = lines.filter(line => line !== '\r')

  return notEmpty.length
}

function levelNestling(string) {
  
}

function methodLength() {

}

async function testCode(string) {
  const code = await readCode('./complexCode.js')
  const numberOfLines = linesOfCode(code)
  console.log(numberOfLines)
}

testCode()