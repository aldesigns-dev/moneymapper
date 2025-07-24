// scripts.test.js

const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

describe('usernameRegex', () => {
  test('valid usernames', () => {
    expect(usernameRegex.test('Abcdef1')).toBe(true);
    expect(usernameRegex.test('A1bcdef')).toBe(true);
    expect(usernameRegex.test('1Abcdef')).toBe(true);
    expect(usernameRegex.test('Ab1cde')).toBe(true);
    expect(usernameRegex.test('ZxYwVu9')).toBe(true);
    expect(usernameRegex.test('A1b2c3')).toBe(true);
    expect(usernameRegex.test('XyZ123')).toBe(true);
    expect(usernameRegex.test('QwErTy1')).toBe(true);
    expect(usernameRegex.test('A2b3C4')).toBe(true);
  });

  test('invalid: too short', () => {
    expect(usernameRegex.test('Ab1')).toBe(false);
    expect(usernameRegex.test('A1b2')).toBe(false);
    expect(usernameRegex.test('aB3')).toBe(false);
    expect(usernameRegex.test('Abc1')).toBe(false);
    expect(usernameRegex.test('A1bC')).toBe(false);
    expect(usernameRegex.test('A1b2C')).toBe(false);
  });

  test('invalid: missing uppercase', () => {
    expect(usernameRegex.test('abcdef1')).toBe(false);
    expect(usernameRegex.test('abc123')).toBe(false);
    expect(usernameRegex.test('a1b2c3')).toBe(false);
    expect(usernameRegex.test('zxcvbn1')).toBe(false);
  });

  test('invalid: missing lowercase', () => {
    expect(usernameRegex.test('ABCDEF1')).toBe(false);
    expect(usernameRegex.test('A1B2C3')).toBe(false);
    expect(usernameRegex.test('123ABC')).toBe(false);
    expect(usernameRegex.test('ZXCVBN1')).toBe(false);
  });

  test('invalid: missing digit', () => {
    expect(usernameRegex.test('Abcdefg')).toBe(false);
    expect(usernameRegex.test('ABCDEFGh')).toBe(false);
    expect(usernameRegex.test('abcDefg')).toBe(false);
    expect(usernameRegex.test('AbCdEfG')).toBe(false);
  });

  test('invalid: contains invalid characters', () => {
    expect(usernameRegex.test('Abcdef!1')).toBe(false);
    expect(usernameRegex.test('Abc_def1')).toBe(false);
    expect(usernameRegex.test('Abcdef-1')).toBe(false);
    expect(usernameRegex.test('Abc def1')).toBe(false);
    expect(usernameRegex.test('Abc.def1')).toBe(false);
    expect(usernameRegex.test('Abcdef@1')).toBe(false);
    expect(usernameRegex.test('Abcdef#1')).toBe(false);
    expect(usernameRegex.test('Abcdef$1')).toBe(false);
  });

  test('invalid: only numbers', () => {
    expect(usernameRegex.test('123456')).toBe(false);
    expect(usernameRegex.test('987654321')).toBe(false);
  });

  test('invalid: only letters', () => {
    expect(usernameRegex.test('abcdef')).toBe(false);
    expect(usernameRegex.test('ABCDEF')).toBe(false);
    expect(usernameRegex.test('AbCdEf')).toBe(false);
  });

  test('invalid: empty string', () => {
    expect(usernameRegex.test('')).toBe(false);
  });

  test('invalid: whitespace only', () => {
    expect(usernameRegex.test('      ')).toBe(false);
    expect(usernameRegex.test('   ')).toBe(false);
  });

  test('invalid: starts with number but missing other requirements', () => {
    expect(usernameRegex.test('1abcde')).toBe(false); // missing uppercase
    expect(usernameRegex.test('1ABCDE')).toBe(false); // missing lowercase
  });

  test('valid: minimum length with all requirements', () => {
    expect(usernameRegex.test('A1bcde')).toBe(true);
    expect(usernameRegex.test('aB1cde')).toBe(true);
    expect(usernameRegex.test('1aBcde')).toBe(true);
  });
});