import { Token, TokenType } from "../../src/types/tokens";

export const basicExpressionParsingStubs = [
  { expression: "t", expected: [new Token(TokenType.T, "t")] },
  {
    expression: "t + 1",
    expected: [
      new Token(TokenType.T, "t"),
      new Token(TokenType.PLUS, "+"),
      new Token(TokenType.NUMBER, "1"),
    ],
  },
  // {
  //   expression: "t + 1 * 2",
  //   expected: [
  //     new Token(TokenType.T, "t"),
  //     new Token(TokenType.PLUS, "+"),
  //     new Token(TokenType.NUMBER, "1"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.NUMBER, "2"),
  //   ],
  // },
  // {
  //   expression: "t + 1.1 * 2.00009 / 3",
  //   expected: [
  //     new Token(TokenType.T, "t"),
  //     new Token(TokenType.PLUS, "+"),
  //     new Token(TokenType.NUMBER, "1.1"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.NUMBER, "2.00009"),
  //     new Token(TokenType.DIV, "/"),
  //     new Token(TokenType.NUMBER, "3"),
  //   ],
  // },
  // {
  //   expression: "t + 1 * 2 - 3",
  //   expected: [
  //     new Token(TokenType.T, "t"),
  //     new Token(TokenType.PLUS, "+"),
  //     new Token(TokenType.NUMBER, "1"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.NUMBER, "2"),
  //     new Token(TokenType.MINUS, "-"),
  //     new Token(TokenType.NUMBER, "3"),
  //   ],
  // },
  // {
  //   expression: "t + 1 * 2 - 3 / 4",
  //   expected: [
  //     new Token(TokenType.T, "t"),
  //     new Token(TokenType.PLUS, "+"),
  //     new Token(TokenType.NUMBER, "1"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.NUMBER, "2"),
  //     new Token(TokenType.MINUS, "-"),
  //     new Token(TokenType.NUMBER, "3"),
  //     new Token(TokenType.DIV, "/"),
  //     new Token(TokenType.NUMBER, "4"),
  //   ],
  // },
  // {
  //   expression: "t + 1 * 2 - 3 / 4 ** 5",
  //   expected: [
  //     new Token(TokenType.T, "t"),
  //     new Token(TokenType.PLUS, "+"),
  //     new Token(TokenType.NUMBER, "1"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.NUMBER, "2"),
  //     new Token(TokenType.MINUS, "-"),
  //     new Token(TokenType.NUMBER, "3"),
  //     new Token(TokenType.DIV, "/"),
  //     new Token(TokenType.NUMBER, "4"),
  //     new Token(TokenType.POWER, "**"),
  //     new Token(TokenType.NUMBER, "5"),
  //   ],
  // },
  // {
  //   expression: "t + 1 * 2 - 3 / 4 ** 5 % 6",
  //   expected: [
  //     new Token(TokenType.T, "t"),
  //     new Token(TokenType.PLUS, "+"),
  //     new Token(TokenType.NUMBER, "1"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.NUMBER, "2"),
  //     new Token(TokenType.MINUS, "-"),
  //     new Token(TokenType.NUMBER, "3"),
  //     new Token(TokenType.DIV, "/"),
  //     new Token(TokenType.NUMBER, "4"),
  //     new Token(TokenType.POWER, "**"),
  //     new Token(TokenType.NUMBER, "5"),
  //     new Token(TokenType.MOD, "%"),
  //     new Token(TokenType.NUMBER, "6"),
  //   ],
  // },
  // {
  //   expression: "t + 1 * 2 - 3 / 4 ** 5 % 6 * (7 + 8)",
  //   expected: [
  //     new Token(TokenType.T, "t"),
  //     new Token(TokenType.PLUS, "+"),
  //     new Token(TokenType.NUMBER, "1"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.NUMBER, "2"),
  //     new Token(TokenType.MINUS, "-"),
  //     new Token(TokenType.NUMBER, "3"),
  //     new Token(TokenType.DIV, "/"),
  //     new Token(TokenType.NUMBER, "4"),
  //     new Token(TokenType.POWER, "**"),
  //     new Token(TokenType.NUMBER, "5"),
  //     new Token(TokenType.MOD, "%"),
  //     new Token(TokenType.NUMBER, "6"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.LEFT_PAREN, "("),
  //     new Token(TokenType.NUMBER, "7"),
  //     new Token(TokenType.PLUS, "+"),
  //     new Token(TokenType.NUMBER, "8"),
  //     new Token(TokenType.RIGHT_PAREN, ")"),
  //   ],
  // },
  // {
  //   expression: "((t + 1 * (2 - 3) / 4) ** 5 % 6 * (7 + 8)) / 9",
  //   expected: [
  //     new Token(TokenType.LEFT_PAREN, "("),
  //     new Token(TokenType.LEFT_PAREN, "("),
  //     new Token(TokenType.T, "t"),
  //     new Token(TokenType.PLUS, "+"),
  //     new Token(TokenType.NUMBER, "1"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.LEFT_PAREN, "("),
  //     new Token(TokenType.NUMBER, "2"),
  //     new Token(TokenType.MINUS, "-"),
  //     new Token(TokenType.NUMBER, "3"),
  //     new Token(TokenType.RIGHT_PAREN, ")"),
  //     new Token(TokenType.DIV, "/"),
  //     new Token(TokenType.NUMBER, "4"),
  //     new Token(TokenType.RIGHT_PAREN, ")"),
  //     new Token(TokenType.POWER, "**"),
  //     new Token(TokenType.NUMBER, "5"),
  //     new Token(TokenType.MOD, "%"),
  //     new Token(TokenType.NUMBER, "6"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.LEFT_PAREN, "("),
  //     new Token(TokenType.NUMBER, "7"),
  //     new Token(TokenType.PLUS, "+"),
  //     new Token(TokenType.NUMBER, "8"),
  //     new Token(TokenType.RIGHT_PAREN, ")"),
  //     new Token(TokenType.RIGHT_PAREN, ")"),
  //     new Token(TokenType.DIV, "/"),
  //     new Token(TokenType.NUMBER, "9"),
  //   ],
  // },
  // {
  //   expression: "(10*sin(2*3.14*t/10))",
  //   expected: [
  //     new Token(TokenType.LEFT_PAREN, "("),
  //     new Token(TokenType.NUMBER, "10"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.SIN, "sin"),
  //     new Token(TokenType.LEFT_PAREN, "("),
  //     new Token(TokenType.NUMBER, "2"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.NUMBER, "3.14"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.T, "t"),
  //     new Token(TokenType.DIV, "/"),
  //     new Token(TokenType.NUMBER, "10"),
  //     new Token(TokenType.RIGHT_PAREN, ")"),
  //     new Token(TokenType.RIGHT_PAREN, ")"),
  //   ],
  // },
  // {
  //   expression: "(-0.35*(cos(3.141*t/25)**100)+0.8)",
  //   expected: [
  //     new Token(TokenType.LEFT_PAREN, "("),
  //     new Token(TokenType.MINUS, "-"),
  //     new Token(TokenType.NUMBER, "0.35"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.LEFT_PAREN, "("),
  //     new Token(TokenType.COS, "cos"),
  //     new Token(TokenType.LEFT_PAREN, "("),
  //     new Token(TokenType.NUMBER, "3.141"),
  //     new Token(TokenType.MUL, "*"),
  //     new Token(TokenType.T, "t"),
  //     new Token(TokenType.DIV, "/"),
  //     new Token(TokenType.NUMBER, "25"),
  //     new Token(TokenType.RIGHT_PAREN, ")"),
  //     new Token(TokenType.POWER, "**"),
  //     new Token(TokenType.NUMBER, "100"),
  //     new Token(TokenType.RIGHT_PAREN, ")"),
  //     new Token(TokenType.PLUS, "+"),
  //     new Token(TokenType.NUMBER, "0.8"),
  //     new Token(TokenType.RIGHT_PAREN, ")"),
  //   ],
  // },
];