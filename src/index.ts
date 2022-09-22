console.log('hello world');
export {};

const strRegex = /^"[^"\\]*(?:\\.[^"\\]*)*"$/;
const numRegex = /^-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[1-9][0-9]*)?$/;

const lexerTestTable: Record<string, { input: string; output: any }> = {
  str: { input: '"foo"', output: 'foo' },
  int: { input: '123', output: 123 },
  int_negative: { input: '-123000', output: -123000 },
  float: { input: '1.2', output: 1.2 },
  float_negative: { input: '-0.23', output: -0.23 },
  float_exp: { input: '-0.23e-2', output: -0.23e-2 },
  true: { input: 'true', output: true },
  false: { input: 'false', output: false },
  null: { input: 'null', output: null },
};

function parseLiteral(str: string): string | number | boolean | null {
  if (str === 'true') {
    return true;
  } else if (str === 'false') {
    return false;
  } else if (str === 'null') {
    return null;
  } else if (strRegex.test(str) || numRegex.test(str)) {
    return JSON.parse(str);
  }
  throw new Error(`Invalid literal: ${str}`);
}

for (const [testName, testIO] of Object.entries(lexerTestTable)) {
  const expectedOutput = testIO.output;
  const actualOutput = parseLiteral(testIO.input);
  const testResult = expectedOutput === actualOutput ? `pass` : `fail`;
  console.log(`${testName} - ${testResult}`);
}
