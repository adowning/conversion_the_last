import { PhpHelpers } from "../typescript_base/php_helpers";
import { IContext, IUser, IGame, IShop } from "../typescript_base/interfaces";

class GameReel {
  public reelsStrip: { [key: string]: number[] } = {
    reelStrip1: [
      9, 7, 4, 11, 7, 12, 8, 9, 11, 10, 12, 6, 11, 7, 9, 11, 12, 3, 6, 8, 10,
      12, 4, 11, 6, 12, 8, 9, 3, 11, 12, 10, 8, 5, 10, 12, 8, 10, 9, 5, 12, 11,
      10, 9, 11, 7, 6, 12, 11, 10, 11, 9, 8, 7, 10, 5, 9, 12, 8, 11, 12, 9, 10,
      3, 9, 7, 4, 11, 7, 12, 8, 9, 11, 10, 23, 12, 6, 11, 7, 9, 11, 12, 4, 6, 8,
      10, 12, 4, 11, 6, 12, 8, 9, 3, 11, 12, 10, 8, 5, 10, 12, 8, 10, 9, 5, 12,
      11, 10, 9, 11, 7, 6, 12, 11, 10, 11, 9, 8, 7, 10, 5, 9, 12, 8, 11, 12, 9,
      10, 4, 9, 7, 4, 11, 7, 12, 8, 9, 11, 10, 24, 12, 6, 11, 7, 9, 11, 12, 3,
      6, 8, 10, 12, 4, 11, 6, 12, 8, 9, 3, 11, 12, 10, 8, 5, 10, 12, 8, 10, 9,
      5, 12, 11, 10, 9, 11, 7, 6, 12, 11, 10, 11, 9, 8, 7, 10, 5, 9, 12, 8, 11,
      12, 9, 10, 5, 9, 7, 4, 11, 7, 12, 8, 9, 11, 10, 25, 12, 6, 11, 7, 9, 11,
      12, 3, 6, 8, 10, 12, 4, 11, 6, 12, 8, 9, 6, 11, 12, 10, 8, 5, 10, 12, 8,
      10, 9, 5, 12, 11, 10, 9, 11, 7, 6, 12, 11, 10, 11, 9, 8, 7, 10, 5, 9, 12,
      8, 11, 12, 9, 10, 6, 9, 7, 4, 11, 7, 12, 8, 9, 11, 10, 12, 6, 11, 7, 9,
      11, 12, 3, 6, 8, 10, 12, 4, 11, 6, 12, 8, 9, 3, 11, 12, 10, 8, 5, 10, 12,
      8, 10, 9, 5, 12, 11, 10, 9, 11, 7, 6, 12, 11, 10, 11, 9, 8, 7, 10, 5, 9,
      12, 8, 11, 12, 9, 7, 10, 9, 7, 4, 11, 7, 12, 8, 9, 11, 10, 23, 12, 6, 11,
      7, 9, 11, 12, 3, 6, 8, 10, 12, 4, 11, 6, 12, 8, 9, 3, 11, 12, 10, 8, 5,
      10, 12, 8, 10, 9, 5, 12, 11, 10, 9, 11, 7, 6, 12, 11, 10, 11, 9, 8, 7, 10,
      5, 9, 12, 8, 11, 12, 9, 10, 8, 7, 9, 4, 11, 7, 12, 8, 9, 11, 10, 24, 12,
      6, 11, 7, 9, 11, 12, 3, 6, 8, 10, 12, 4, 11, 6, 12, 8, 9, 3, 11, 12, 10,
      8, 5, 10, 12, 8, 10, 9, 5, 12, 11, 10, 9, 11, 7, 6, 12, 11, 10, 11, 9, 8,
      7, 10, 5, 9, 12, 8, 9, 11, 12, 9, 10, 9, 7, 4, 11, 7, 12, 8, 9, 11, 10,
      25, 12, 6, 11, 7, 9, 11, 12, 10, 6, 8, 10, 12, 4, 11, 6, 12, 8, 9, 3, 11,
      12, 10, 8, 5, 10, 12, 8, 10, 9, 5, 12, 11, 10, 9, 11, 7, 6, 12, 11, 10,
      11, 9, 8, 7, 10, 5, 9, 12, 8, 10, 11, 12, 9, 10, 9, 7, 4, 11, 7, 12, 8, 9,
      11, 10, 12, 6, 11, 7, 9, 11, 12, 10, 6, 8, 10, 12, 4, 11, 6, 12, 8, 9, 3,
      11, 12, 10, 8, 5, 10, 12, 8, 10, 9, 5, 12, 11, 10, 9, 11, 7, 6, 12, 11,
      10, 11, 9, 8, 7, 10, 5, 9, 12, 8, 11, 12, 9, 10, 11, 9, 7, 4, 11, 7, 12,
      8, 9, 11, 10, 23, 12, 6, 11, 7, 9, 11, 12, 10, 6, 8, 10, 12, 4, 11, 6, 12,
      8, 9, 3, 11, 12, 10, 8, 5, 10, 12, 8, 10, 9, 5, 12, 11, 10, 9, 11, 7, 6,
      12, 11, 10, 11, 9, 8, 7, 10, 5, 9, 12, 8, 11, 12, 9, 10, 12, 9, 7, 4, 11,
      7, 12, 8, 9, 11, 10, 24, 12, 6, 11, 7, 9, 11, 12, 3, 6, 8, 10, 12, 4, 11,
      6, 12, 8, 9, 3, 11, 12, 10, 8, 5, 10, 12, 8, 10, 9, 5, 12, 11, 10, 9, 11,
      7, 6, 12, 11, 10, 11, 9, 8, 7, 10, 5, 9, 12, 8, 11, 12, 9, 10, 9, 7, 4,
      11, 7, 12, 8, 9, 11, 10, 25, 12, 6, 11, 7, 9, 11, 12, 3, 6, 8, 10, 12, 4,
      11, 6, 12, 8, 9, 3, 11, 12, 10, 8, 5, 10, 12, 8, 10, 9, 5, 12, 11, 10, 9,
      11, 7, 6, 12, 11, 10, 11, 9, 8, 7, 10, 5, 9, 12, 8, 11, 12, 9, 10, 9, 7,
      4, 11, 7, 12, 8, 9, 11, 10, 23, 12, 6, 11, 7, 9, 11, 12, 3, 6, 8, 10, 12,
      4, 11, 6, 12, 8, 9, 3, 11, 12, 10, 8, 5, 10, 12, 8, 10, 9, 5, 12, 11, 10,
      9, 11, 7, 6, 12, 11, 10, 11, 9, 8, 7, 10, 5, 9, 12, 8, 11, 12, 9, 10, 9,
      7, 4, 11, 7, 12, 8, 9, 11, 10, 23, 12, 6, 11, 7, 9, 11, 12, 3, 6, 8, 10,
      12, 4, 11, 6, 12, 8, 9, 3, 11, 12, 10, 8, 5, 10, 12, 8, 10, 9, 5, 12, 11,
      10, 9, 11, 7, 6, 12, 11, 10, 11, 9, 8, 7, 10, 5, 9, 12, 8, 11, 12, 9, 10,
      9, 7, 4, 11, 7, 12, 8, 9, 11, 10, 23, 12, 6, 11, 7, 9, 11, 12, 3, 6, 8,
      10, 12, 4, 11, 6, 12, 8, 9, 3, 11, 12, 10, 8, 5, 10, 12, 8, 10, 9, 5, 12,
      11, 10, 9, 11, 7, 6, 12, 11, 10, 11, 9, 8, 7, 10, 5, 9, 12, 8, 11, 12, 9,
      10, 9, 7, 4, 11, 7, 12, 8, 9, 11, 10, 25, 12, 6, 11, 7, 9, 11, 12, 3, 6,
      8, 10, 12, 4, 11, 6, 12, 8, 9, 3, 11, 12, 10, 8, 5, 10, 12, 8, 10, 9, 5,
      12, 11, 10, 9, 11, 7, 6, 12, 11, 10, 11, 9, 8, 7, 10, 5, 9, 12, 8, 11, 12,
      9, 10, 9, 7, 4, 11, 7, 12, 8, 9, 11, 10, 25, 12, 6, 11, 7, 9, 11, 12, 3,
      6, 8, 10, 12, 4, 11, 6, 12, 8, 9, 3, 11, 12, 10, 8, 5, 10, 12, 8, 10, 9,
      5, 12, 11, 10, 9, 11, 7, 6, 12, 11, 10, 11, 9, 8, 7, 10, 5, 9, 12, 8, 11,
      12, 9, 10, 9, 7, 4, 11, 7, 12, 8, 9, 11, 10, 25, 12, 6, 11, 7, 9, 11, 12,
      3, 6, 8, 10, 12, 4, 11, 6, 12, 8, 9, 3, 11, 12, 10, 8, 5, 10, 12, 8, 10,
      9, 5, 12, 11, 10, 9, 11, 7, 6, 12, 11, 10, 11, 9, 8, 7, 10, 5, 9, 12, 8,
      11, 12, 9, 10,
    ],
    reelStrip2: [
      11, 3, 6, 10, 7, 4, 8, 5, 9, 12, 21, 10, 12, 8, 4, 10, 6, 12, 8, 6, 10, 5,
      12, 8, 10, 12, 9, 8, 6, 4, 12, 11, 8, 10, 3, 4, 12, 11, 6, 9, 7, 8, 10, 9,
      11, 12, 4, 6, 8, 10, 12, 7, 8, 10, 4, 11, 9, 6, 10, 5, 12, 6, 10, 7, 8,
      12, 9, 11, 3, 6, 10, 7, 4, 8, 5, 9, 12, 22, 10, 12, 8, 4, 10, 6, 12, 8, 6,
      10, 5, 12, 8, 10, 12, 9, 8, 6, 4, 12, 11, 8, 10, 3, 4, 12, 11, 6, 9, 7, 8,
      10, 9, 11, 12, 4, 6, 8, 10, 12, 7, 8, 10, 4, 11, 9, 6, 10, 5, 12, 6, 10,
      7, 8, 12, 9, 11, 3, 6, 10, 7, 4, 8, 5, 9, 12, 23, 10, 12, 8, 4, 10, 6, 12,
      8, 6, 10, 5, 12, 8, 10, 12, 9, 8, 6, 4, 12, 11, 8, 10, 3, 4, 12, 11, 6, 9,
      7, 8, 10, 9, 11, 12, 4, 6, 8, 10, 12, 7, 8, 10, 4, 11, 9, 6, 10, 5, 12, 6,
      10, 7, 8, 12, 9, 11, 3, 6, 10, 7, 4, 8, 5, 9, 12, 24, 10, 12, 8, 4, 10, 6,
      12, 8, 6, 10, 5, 12, 8, 10, 12, 9, 8, 6, 4, 12, 11, 8, 10, 3, 4, 12, 11,
      6, 9, 7, 8, 10, 9, 11, 12, 4, 6, 8, 10, 12, 7, 8, 10, 4, 11, 9, 6, 3, 5,
      12, 6, 10, 7, 8, 12, 9, 11, 3, 6, 10, 7, 4, 8, 5, 9, 12, 25, 10, 12, 8, 4,
      10, 6, 12, 8, 6, 10, 5, 12, 8, 10, 12, 9, 8, 6, 4, 12, 11, 8, 10, 3, 4,
      12, 11, 6, 9, 7, 8, 10, 9, 11, 12, 4, 6, 8, 10, 12, 7, 8, 10, 4, 11, 9, 6,
      3, 5, 12, 6, 10, 7, 8, 12, 9, 11, 3, 6, 10, 7, 4, 8, 5, 9, 12, 21, 10, 12,
      8, 4, 10, 6, 12, 8, 6, 10, 5, 12, 8, 10, 12, 9, 8, 6, 4, 12, 11, 8, 10, 3,
      4, 12, 11, 6, 9, 7, 8, 10, 9, 11, 12, 4, 6, 8, 10, 12, 7, 8, 10, 4, 11, 9,
      6, 3, 5, 12, 6, 10, 7, 8, 12, 9, 11, 3, 6, 10, 7, 4, 8, 5, 9, 12, 22, 10,
      12, 8, 4, 10, 6, 12, 8, 6, 10, 5, 12, 8, 10, 12, 9, 8, 6, 4, 12, 11, 8,
      10, 3, 4, 12, 11, 6, 9, 7, 8, 10, 9, 11, 12, 4, 6, 8, 10, 12, 7, 8, 10, 4,
      11, 9, 6, 3, 5, 12, 6, 10, 7, 8, 12, 9, 11, 3, 6, 10, 7, 4, 8, 5, 9, 12,
      23, 10, 12, 8, 4, 10, 6, 12, 8, 6, 10, 5, 12, 8, 10, 12, 9, 8, 6, 4, 12,
      11, 8, 10, 3, 4, 12, 11, 6, 9, 7, 8, 10, 9, 11, 12, 4, 6, 8, 10, 12, 7, 8,
      10, 4, 11, 9, 6, 3, 5, 12, 6, 10, 7, 8, 12, 9, 11, 3, 6, 10, 7, 4, 8, 5,
      9, 12, 24, 10, 12, 8, 4, 10, 6, 12, 8, 6, 10, 5, 12, 8, 10, 12, 9, 8, 6,
      4, 12, 11, 8, 10, 3, 4, 12, 11, 6, 9, 7, 8, 10, 9, 11, 12, 4, 6, 8, 10,
      12, 7, 8, 10, 4, 11, 9, 6, 3, 5, 12, 6, 10, 7, 8, 12, 9, 11, 3, 6, 10, 7,
      4, 8, 5, 9, 12, 25, 10, 12, 8, 4, 10, 6, 12, 8, 6, 10, 5, 12, 8, 10, 12,
      9, 8, 6, 4, 12, 11, 8, 10, 3, 4, 12, 11, 6, 9, 7, 8, 10, 9, 11, 12, 4, 6,
      8, 10, 12, 7, 8, 10, 4, 11, 9, 6, 3, 5, 12, 6, 10, 7, 8, 12, 9, 11, 3, 6,
      10, 7, 4, 8, 5, 9, 12, 23, 10, 12, 8, 4, 10, 6, 12, 8, 6, 10, 5, 12, 8,
      10, 12, 9, 8, 6, 4, 12, 11, 8, 10, 3, 4, 12, 11, 6, 9, 7, 8, 10, 9, 11,
      12, 4, 6, 8, 10, 12, 7, 8, 10, 4, 11, 9, 6, 3, 5, 12, 6, 10, 7, 8, 12, 9,
      11, 3, 6, 10, 7, 4, 8, 5, 9, 12, 25, 10, 12, 8, 4, 10, 6, 12, 8, 6, 10, 5,
      12, 8, 10, 12, 9, 8, 6, 4, 12, 11, 8, 10, 3, 4, 12, 11, 6, 9, 7, 8, 10, 9,
      11, 12, 4, 6, 8, 10, 12, 7, 8, 10, 4, 11, 9, 6, 10, 5, 12, 6, 10, 7, 8,
      12, 9, 11, 3, 6, 10, 7, 4, 8, 5, 9, 12, 23, 10, 12, 8, 4, 10, 6, 12, 8, 6,
      10, 5, 12, 8, 10, 12, 9, 8, 6, 4, 12, 11, 8, 10, 3, 4, 12, 11, 6, 9, 7, 8,
      10, 9, 11, 12, 4, 6, 8, 10, 12, 7, 8, 10, 4, 11, 9, 6, 3, 5, 12, 6, 10, 7,
      8, 12, 9, 11, 3, 6, 10, 7, 4, 8, 5, 9, 12, 25, 10, 12, 8, 4, 10, 6, 12, 8,
      6, 10, 5, 12, 8, 10, 12, 9, 8, 6, 4, 12, 11, 8, 10, 3, 4, 12, 11, 6, 9, 7,
      8, 10, 9, 11, 12, 4, 6, 8, 10, 12, 7, 8, 10, 4, 11, 9, 6, 10, 5, 12, 6,
      10, 7, 8, 12, 9,
    ],
    reelStrip3: [
      12, 5, 11, 8, 10, 3, 6, 7, 21, 11, 9, 7, 10, 5, 11, 9, 5, 7, 3, 8, 7, 11,
      9, 7, 5, 3, 11, 9, 6, 11, 12, 3, 9, 5, 10, 11, 8, 4, 10, 7, 11, 12, 5, 9,
      12, 3, 11, 5, 6, 11, 4, 7, 8, 4, 9, 12, 10, 3, 4, 9, 5, 6, 8, 9, 7, 10,
      11, 12, 5, 11, 8, 10, 3, 6, 7, 22, 11, 9, 7, 3, 5, 11, 9, 5, 7, 3, 8, 7,
      11, 9, 7, 5, 3, 11, 9, 6, 11, 12, 3, 9, 5, 10, 11, 8, 4, 10, 7, 11, 12, 5,
      9, 12, 3, 11, 5, 6, 11, 4, 7, 8, 4, 9, 12, 10, 3, 4, 9, 5, 6, 8, 9, 7, 10,
      11, 12, 5, 11, 8, 10, 3, 6, 7, 23, 11, 9, 7, 3, 5, 11, 9, 5, 7, 3, 8, 7,
      11, 9, 7, 5, 3, 11, 9, 6, 11, 12, 3, 9, 5, 10, 11, 8, 4, 10, 7, 11, 12, 5,
      9, 12, 3, 11, 5, 6, 11, 4, 7, 8, 4, 9, 12, 10, 3, 4, 9, 5, 6, 8, 9, 7, 10,
      11, 12, 5, 11, 8, 10, 3, 6, 7, 24, 11, 9, 7, 3, 5, 11, 9, 5, 7, 3, 8, 7,
      11, 9, 7, 5, 3, 11, 9, 6, 11, 12, 3, 9, 5, 10, 11, 8, 4, 10, 7, 11, 12, 5,
      9, 12, 3, 11, 5, 6, 11, 4, 7, 8, 4, 9, 12, 10, 3, 4, 9, 5, 6, 8, 9, 7, 10,
      11, 12, 5, 11, 8, 10, 3, 6, 7, 25, 11, 9, 7, 3, 5, 11, 9, 5, 7, 3, 8, 7,
      11, 9, 7, 5, 3, 11, 9, 6, 11, 12, 3, 9, 5, 10, 11, 8, 4, 10, 7, 11, 12, 5,
      9, 12, 3, 11, 5, 6, 11, 4, 7, 8, 4, 9, 12, 10, 3, 4, 9, 5, 6, 8, 9, 7, 10,
      11, 12, 5, 11, 8, 10, 3, 6, 7, 21, 11, 9, 7, 3, 5, 11, 9, 5, 7, 3, 8, 7,
      11, 9, 7, 5, 3, 11, 9, 6, 11, 12, 3, 9, 5, 10, 11, 8, 4, 10, 7, 11, 12, 5,
      9, 12, 3, 11, 5, 6, 11, 4, 7, 8, 4, 9, 12, 10, 3, 4, 9, 5, 6, 8, 9, 7, 10,
      11, 12, 5, 11, 8, 10, 3, 6, 7, 22, 11, 9, 7, 12, 5, 11, 9, 5, 7, 3, 8, 7,
      11, 9, 7, 5, 3, 11, 9, 6, 11, 12, 3, 9, 5, 10, 11, 8, 4, 10, 7, 11, 12, 5,
      9, 12, 3, 11, 5, 6, 11, 4, 7, 8, 4, 9, 12, 10, 3, 4, 9, 5, 6, 8, 9, 7, 10,
      11, 12, 5, 11, 8, 10, 3, 6, 7, 23, 11, 9, 7, 12, 5, 11, 9, 5, 7, 3, 8, 7,
      11, 9, 7, 5, 3, 11, 9, 6, 11, 12, 3, 9, 5, 10, 11, 8, 4, 10, 7, 11, 12, 5,
      9, 12, 3, 11, 5, 6, 11, 4, 7, 8, 4, 9, 12, 10, 3, 4, 9, 5, 6, 8, 9, 7, 10,
      11, 12, 5, 11, 8, 10, 3, 6, 7, 24, 11, 9, 7, 12, 5, 11, 9, 5, 7, 3, 8, 7,
      11, 9, 7, 5, 3, 11, 9, 6, 11, 12, 3, 9, 5, 10, 11, 8, 4, 10, 7, 11, 12, 5,
      9, 12, 3, 11, 5, 6, 11, 4, 7, 8, 4, 9, 12, 10, 3, 4, 9, 5, 6, 8, 9, 7, 10,
      11, 12, 5, 11, 8, 10, 3, 6, 7, 25, 11, 9, 7, 12, 5, 11, 9, 5, 7, 3, 8, 7,
      11, 9, 7, 5, 3, 11, 9, 6, 11, 12, 3, 9, 5, 10, 11, 8, 4, 10, 7, 11, 12, 5,
      9, 12, 3, 11, 5, 6, 11, 4, 7, 8, 4, 9, 12, 10, 3, 4, 9, 5, 6, 8, 9, 7, 10,
      11, 12, 5, 11, 8, 10, 3, 6, 7, 23, 11, 9, 7, 12, 5, 11, 9, 5, 7, 3, 8, 7,
      11, 9, 7, 5, 3, 11, 9, 6, 11, 12, 3, 9, 5, 10, 11, 8, 4, 10, 7, 11, 12, 5,
      9, 12, 3, 11, 5, 6, 11, 4, 7, 8, 4, 9, 12, 10, 3, 4, 9, 5, 6, 8, 9, 7, 10,
      11, 12, 5, 11, 8, 10, 3, 6, 7, 25, 11, 9, 7, 12, 5, 11, 9, 5, 7, 3, 8, 7,
      11, 9, 7, 5, 3, 11, 9, 6, 11, 12, 3, 9, 5, 10, 11, 8, 4, 10, 7, 11, 12, 5,
      9, 12, 3, 11, 5, 6, 11, 4, 7, 8, 4, 9, 12, 10, 3, 4, 9, 5, 6, 8, 9, 7, 10,
      11,
    ],
    reelStrip4: [
      4, 9, 8, 12, 7, 10, 3, 6, 9, 12, 5, 11, 8, 21, 10, 7, 3, 6, 9, 12, 5, 8,
      11, 10, 12, 8, 9, 12, 4, 10, 11, 9, 10, 8, 7, 6, 12, 11, 5, 12, 11, 9, 10,
      11, 12, 4, 9, 8, 12, 7, 10, 3, 6, 9, 12, 5, 11, 8, 22, 10, 7, 6, 10, 9,
      12, 5, 8, 11, 10, 12, 8, 9, 12, 4, 10, 11, 9, 10, 8, 7, 6, 12, 11, 5, 12,
      11, 9, 10, 11, 12, 4, 9, 8, 12, 7, 10, 3, 6, 9, 12, 5, 11, 8, 23, 10, 7,
      3, 6, 9, 12, 5, 8, 11, 10, 12, 8, 9, 12, 4, 10, 11, 9, 10, 8, 7, 6, 12,
      11, 5, 12, 11, 9, 10, 11, 12, 4, 9, 8, 12, 7, 10, 3, 6, 9, 12, 5, 11, 8,
      24, 10, 7, 3, 6, 9, 12, 5, 8, 11, 10, 12, 8, 9, 12, 4, 10, 11, 9, 10, 8,
      7, 6, 12, 11, 5, 12, 11, 9, 10, 11, 12, 4, 9, 8, 12, 7, 10, 3, 6, 9, 12,
      5, 11, 8, 25, 10, 7, 3, 6, 9, 12, 5, 8, 11, 10, 12, 8, 9, 12, 4, 10, 11,
      9, 10, 8, 7, 6, 12, 11, 5, 12, 11, 9, 10, 11, 12, 4, 9, 8, 12, 7, 10, 3,
      6, 9, 12, 5, 11, 8, 21, 10, 7, 3, 6, 9, 12, 5, 8, 11, 10, 12, 8, 9, 12, 4,
      10, 11, 9, 10, 8, 7, 6, 12, 11, 5, 12, 11, 9, 10, 11, 12, 4, 9, 8, 12, 7,
      10, 3, 6, 9, 12, 5, 11, 8, 22, 10, 7, 6, 10, 9, 12, 5, 8, 11, 10, 12, 8,
      9, 12, 4, 10, 11, 9, 10, 8, 7, 6, 12, 11, 5, 12, 11, 9, 10, 11, 12, 4, 9,
      8, 12, 7, 10, 3, 6, 9, 12, 5, 11, 8, 23, 10, 7, 3, 6, 9, 12, 5, 8, 11, 10,
      12, 8, 9, 12, 4, 10, 11, 9, 10, 8, 7, 6, 12, 11, 5, 12, 11, 9, 10, 11, 12,
      4, 9, 8, 12, 7, 10, 3, 6, 9, 12, 5, 11, 8, 24, 10, 7, 3, 6, 9, 12, 5, 8,
      11, 10, 12, 8, 9, 12, 4, 10, 11, 9, 10, 8, 7, 6, 12, 11, 5, 12, 11, 9, 10,
      11, 12, 4, 9, 8, 12, 7, 10, 3, 6, 9, 12, 5, 11, 8, 25, 10, 7, 3, 6, 9, 12,
      5, 8, 11, 10, 12, 8, 9, 12, 4, 10, 11, 9, 10, 8, 7, 6, 12, 11, 5, 12, 11,
      9, 10, 11, 12, 4, 9, 8, 12, 7, 10, 3, 6, 9, 12, 5, 11, 8, 21, 10, 7, 3, 6,
      9, 12, 5, 8, 11, 10, 12, 8, 9, 12, 4, 10, 11, 9, 10, 8, 7, 6, 12, 11, 5,
      12, 11, 9, 10, 11, 12, 4, 9, 8, 12, 7, 10, 3, 6, 9, 12, 5, 11, 8, 22, 10,
      7, 6, 10, 9, 12, 5, 8, 11, 10, 12, 8, 9, 12, 4, 10, 11, 9, 10, 8, 7, 6,
      12, 11, 5, 12, 11, 9, 10, 11, 12, 4, 9, 8, 12, 7, 10, 3, 6, 9, 12, 5, 11,
      8, 23, 10, 7, 3, 6, 9, 12, 5, 8, 11, 10, 12, 8, 9, 12, 4, 10, 11, 9, 10,
      8, 7, 6, 12, 11, 5, 12, 11, 9, 10, 11, 12, 4, 9, 8, 12, 7, 10, 3, 6, 9,
      12, 5, 11, 8, 22, 10, 7, 3, 6, 9, 12, 5, 8, 11, 10, 12, 8, 9, 12, 4, 10,
      11, 9, 10, 8, 7, 6, 12, 11, 5, 12, 11, 9, 10, 11, 12, 4, 9, 8, 12, 7, 10,
      3, 6, 9, 12, 5, 11, 8, 25, 10, 7, 3, 6, 9, 12, 5, 8, 11, 10, 12, 8, 9, 12,
      4, 10, 11, 9, 10, 8, 7, 6, 12, 11, 5, 12, 11, 9, 10, 11, 12,
    ],
    reelStrip5: [
      8, 5, 12, 4, 11, 3, 10, 7, 4, 9, 10, 8, 11, 10, 6, 9, 10, 12, 5, 8, 11, 7,
      6, 12, 7, 9, 12, 10, 9, 11, 8, 12, 11, 10, 9, 8, 11, 6, 12, 11, 5, 7, 9,
      10, 12, 8, 5, 12, 4, 11, 3, 10, 7, 4, 9, 23, 10, 8, 3, 10, 11, 6, 9, 12,
      5, 8, 11, 7, 6, 12, 7, 9, 12, 10, 9, 11, 8, 12, 11, 10, 9, 8, 11, 6, 12,
      11, 5, 7, 9, 10, 12, 8, 5, 12, 4, 11, 3, 10, 7, 4, 9, 24, 10, 8, 3, 10,
      11, 6, 9, 12, 5, 8, 11, 7, 6, 12, 7, 9, 12, 10, 9, 11, 8, 12, 11, 10, 9,
      8, 11, 6, 12, 11, 5, 7, 9, 10, 12, 8, 5, 12, 4, 11, 3, 10, 7, 4, 9, 25,
      10, 8, 3, 10, 11, 6, 9, 12, 5, 8, 11, 7, 6, 12, 7, 9, 12, 10, 9, 11, 8,
      12, 11, 10, 9, 8, 11, 6, 12, 11, 5, 7, 9, 10, 12,
    ],
    reelStrip6: [],
  };
  public reelsStripBonus: { [key: string]: number[] } = {
    reelStripBonus1: [],
    reelStripBonus2: [],
    reelStripBonus3: [],
    reelStripBonus4: [],
    reelStripBonus5: [],
    reelStripBonus6: [],
  };
}

export class SlotSettings {
  public isStateless = true;
  public playerId: number;
  public splitScreen: any = null;
  public reelStrip1: number[] = [];
  public reelStrip2: number[] = [];
  public reelStrip3: number[] = [];
  public reelStrip4: number[] = [];
  public reelStrip5: number[] = [];
  public reelStrip6: number[] = [];
  public reelStripBonus1: number[] = [];
  public reelStripBonus2: number[] = [];
  public reelStripBonus3: number[] = [];
  public reelStripBonus4: number[] = [];
  public reelStripBonus5: number[] = [];
  public reelStripBonus6: number[] = [];
  public slotId: string = "";
  public slotDBId: string = "";
  public Line: any = null;
  public scaleMode: any = null;
  public numFloat: any = null;
  public gameLine: any = null;
  public Bet: any = null;
  public isBonusStart: any = null;
  public Balance: any = null;
  public SymbolGame: any = null;
  public GambleType: any = null;
  public lastEvent: any = null;
  public Jackpots: any = [];
  public keyController: any = null;
  public slotViewState: any = null;
  public hideButtons: any = null;
  public slotReelsConfig: any = null;
  public slotFreeCount: any = null;
  public slotFreeMpl: any = null;
  public slotWildMpl: any = null;
  public slotExitUrl: any = null;
  public slotBonus: any = null;
  public slotBonusType: any = null;
  public slotScatterType: any = null;
  public slotGamble: any = null;
  public Paytable: { [key: string]: number[] } = {};
  public slotSounds: any = [];
  public jpgs: any = null;
  private Bank: any = null;
  private Percent: any = null;
  private WinLine: any = null;
  private WinGamble: any = null;
  private Bonus: any = null;
  private shop_id: any = null;
  public currency: any = null;
  public user: IUser;
  public game: IGame;
  public shop: IShop;
  public jpgPercentZero = false;
  public count_balance: any = null;
  public MaxWin: number = 0;
  public increaseRTP: number = 1;
  public CurrentDenom: number = 1;
  public CurrentDenomination: number = 1;
  public Denominations: number[] = [];
  public slotJackPercent: any = [];
  public slotJackpot: any = [];
  public AllBet: number = 0;
  public gameData: any = {};
  public gameDataStatic: any = {};
  public betRemains: number = 0;
  public betRemains0: number = 0;
  public toGameBanks: number = 0;
  public toSlotJackBanks: number = 0;
  public toSysJackBanks: number = 0;
  public betProfit: number = 0;
  public slotCurrency: string = "";

  constructor(sid: string, playerId: number, context: IContext) {
    this.slotId = sid;
    this.isStateless = true; // (bool)$context;
    this.playerId = playerId;
    this.user = context.user;
    this.shop_id = this.user.shop_id;
    this.game = context.game;
    this.shop = context.shop;
    this.slotCurrency = this.shop.currency;

    const bankObj = context.bank;
    this.Bank =
      bankObj.slots +
      bankObj.bonus +
      bankObj.fish +
      bankObj.table_bank +
      bankObj.little;

    this.MaxWin = this.shop.max_win;
    this.increaseRTP = 1;
    this.CurrentDenom = this.game.denomination;
    this.scaleMode = 0;
    this.numFloat = 0;

    this.Paytable["SYM_0"] = [0, 0, 0, 0, 0, 0];
    this.Paytable["SYM_1"] = [0, 0, 0, 0, 0, 0];
    this.Paytable["SYM_2"] = [0, 0, 0, 0, 0, 0];
    this.Paytable["SYM_3"] = [0, 0, 0, 25, 120, 700];
    this.Paytable["SYM_4"] = [0, 0, 0, 20, 80, 350];
    this.Paytable["SYM_5"] = [0, 0, 0, 15, 60, 250];
    this.Paytable["SYM_6"] = [0, 0, 0, 15, 50, 180];
    this.Paytable["SYM_7"] = [0, 0, 0, 10, 40, 140];
    this.Paytable["SYM_8"] = [0, 0, 0, 5, 20, 70];
    this.Paytable["SYM_9"] = [0, 0, 0, 5, 15, 60];
    this.Paytable["SYM_10"] = [0, 0, 0, 5, 15, 50];
    this.Paytable["SYM_11"] = [0, 0, 0, 5, 10, 40];
    this.Paytable["SYM_12"] = [0, 0, 0, 5, 10, 30];

    const reel = new GameReel();
    const strips = [
      "reelStrip1",
      "reelStrip2",
      "reelStrip3",
      "reelStrip4",
      "reelStrip5",
      "reelStrip6",
    ];

    for (const reelStrip of strips) {
      if (reel.reelsStrip[reelStrip] && reel.reelsStrip[reelStrip].length > 0) {
        (this as any)[reelStrip] = reel.reelsStrip[reelStrip];
      }
    }

    this.keyController = {
      "13": "uiButtonSpin,uiButtonSkip",
      "49": "uiButtonInfo",
      "50": "uiButtonCollect",
      "51": "uiButtonExit2",
      "52": "uiButtonLinesMinus",
      "53": "uiButtonLinesPlus",
      "54": "uiButtonBetMinus",
      "55": "uiButtonBetPlus",
      "56": "uiButtonGamble",
      "57": "uiButtonRed",
      "48": "uiButtonBlack",
      "189": "uiButtonAuto",
      "187": "uiButtonSpin",
    };

    this.slotReelsConfig = [
      [425, 142, 3],
      [669, 142, 3],
      [913, 142, 3],
      [1157, 142, 3],
      [1401, 142, 3],
    ];

    this.slotBonusType = 1;
    this.slotScatterType = 0;
    this.splitScreen = false;
    this.slotBonus = false; // Changed to false as per GoBananas
    this.slotGamble = true;
    // this.slotFastStop = 1; // Not used in TS
    this.slotExitUrl = "/";
    this.slotWildMpl = 1;
    this.GambleType = 1;
    this.Denominations = [
      0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1.0, 2.0, 5.0, 10.0, 20.0, 50.0, 100.0,
    ];
    this.CurrentDenom = this.Denominations[0];
    this.CurrentDenomination = this.Denominations[0];
    this.slotFreeCount = [0, 0, 0, 15, 30, 60];
    this.slotFreeMpl = 1;
    this.slotViewState =
      this.game.slotViewState == "" ? "Normal" : this.game.slotViewState;
    this.hideButtons = [];
    this.jpgs = context.jpgs;
    this.slotJackPercent = [];
    this.slotJackpot = [];

    for (let jp = 1; jp <= 4; jp++) {
      this.slotJackpot.push((this.game as any)["jp_" + jp]);
      this.slotJackPercent.push((this.game as any)["jp_" + jp + "_percent"]);
    }

    this.Line = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.gameLine = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.Bet = this.game.bet.split(",");
    this.Balance = this.user.balance;
    this.SymbolGame = ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    this.Percent = this.shop.percent;
    this.WinGamble = Number(this.game.rezerv); // reserved is used for WinGamble
    this.slotDBId = String(this.game.id);
    this.count_balance = this.user.count_balance;

    if (Number(this.user.balance) == 0) {
      this.Percent = 100;
    }

    if (!this.user.session || this.user.session.length <= 0) {
      this.gameData = {};
    } else {
      try {
        this.gameData = JSON.parse(this.user.session);
      } catch (e) {
        this.gameData = {};
      }
    }

    if (!this.game.advanced || this.game.advanced.length <= 0) {
      this.gameDataStatic = {};
    } else {
      try {
        this.gameDataStatic = JSON.parse(this.game.advanced);
      } catch (e) {
        this.gameDataStatic = {};
      }
    }
  }

  public is_active(): boolean {
    return true;
  }

  public SetGameData(key: string, value: any): void {
    const timeLife = 86400;
    this.gameData[key] = {
      timelife: PhpHelpers.time() + timeLife,
      payload: value,
    };
  }

  public GetGameData(key: string): any {
    if (this.gameData[key]) {
      return this.gameData[key]["payload"];
    } else {
      return 0;
    }
  }

  public FormatFloat(num: any): any {
    const str0 = String(num).split(".");
    if (str0[1]) {
      if (str0[1].length > 4) {
        return Math.round(num * 100) / 100;
      } else if (str0[1].length > 2) {
        return Math.floor(num * 100) / 100;
      } else {
        return num;
      }
    } else {
      return num;
    }
  }

  public SaveGameData(): void {
    this.user.session = JSON.stringify(this.gameData);
  }

  public CheckBonusWin(): number {
    let allRateCnt = 0;
    let allRate = 0;
    for (const key in this.Paytable) {
      const vl = this.Paytable[key];
      for (const vl2 of vl) {
        if (vl2 > 0) {
          allRateCnt++;
          allRate += vl2;
          break;
        }
      }
    }
    return allRate / allRateCnt;
  }

  public GetRandomPay(): number {
    let allRate: number[] = [];
    for (const key in this.Paytable) {
      const vl = this.Paytable[key];
      for (const vl2 of vl) {
        if (vl2 > 0) {
          allRate.push(vl2);
        }
      }
    }

    for (let i = allRate.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allRate[i], allRate[j]] = [allRate[j], allRate[i]];
    }

    if (this.game.stat_in < this.game.stat_out + allRate[0] * this.AllBet) {
      allRate[0] = 0;
    }
    return allRate[0];
  }

  public HasGameDataStatic(key: string): boolean {
    if (this.gameDataStatic[key]) {
      return true;
    } else {
      return false;
    }
  }

  public SaveGameDataStatic(): void {
    this.game.advanced = JSON.stringify(this.gameDataStatic);
  }

  public SetGameDataStatic(key: string, value: any): void {
    const timeLife = 86400;
    this.gameDataStatic[key] = {
      timelife: PhpHelpers.time() + timeLife,
      payload: value,
    };
  }

  public GetGameDataStatic(key: string): any {
    if (this.gameDataStatic[key]) {
      return this.gameDataStatic[key]["payload"];
    } else {
      return 0;
    }
  }

  public HasGameData(key: string): boolean {
    if (this.gameData[key]) {
      return true;
    } else {
      return false;
    }
  }

  public GetHistory(): any {
    return "NULL";
  }

  public UpdateJackpots(bet: number): void {
    // Stateless placeholder
  }

  public GetBank(slotState: string = ""): number {
    if (
      this.isBonusStart ||
      slotState == "bonus" ||
      slotState == "freespin" ||
      slotState == "respin"
    ) {
      slotState = "bonus";
    } else {
      slotState = "";
    }
    return this.Bank / this.CurrentDenom;
  }

  public GetPercent(): number {
    return this.Percent;
  }

  public InternalError(errcode: string): void {
    console.error("Internal Error", errcode);
  }

  public InternalErrorSilent(errcode: any): void {
    console.error("Internal Error Silent", errcode);
  }

  public SetBank(
    slotState: string = "",
    sum: number,
    slotEvent: string = ""
  ): IGame {
    if (
      this.isBonusStart ||
      slotState == "bonus" ||
      slotState == "freespin" ||
      slotState == "respin"
    ) {
      slotState = "bonus";
    } else {
      slotState = "";
    }
    if (this.GetBank(slotState) + sum < 0) {
      this.InternalError(
        "Bank_   " +
          sum +
          "  CurrentBank_ ".this.GetBank(slotState) +
          " CurrentState_ " +
          slotState +
          " Trigger_ " +
          (this.GetBank(slotState) + sum)
      );
    }
    sum = sum * this.CurrentDenom;
    const game = this.game;
    let bankBonusSum = 0;
    if (sum > 0 && slotEvent == "bet") {
      this.toGameBanks = 0;
      this.toSlotJackBanks = 0;
      this.toSysJackBanks = 0;
      this.betProfit = 0;
      const prc = this.GetPercent();
      let prc_b = 10;
      if (prc <= prc_b) {
        prc_b = 0;
      }
      const count_balance = this.count_balance;
      const gameBet = (sum / this.GetPercent()) * 100;
      if (count_balance < gameBet && count_balance > 0) {
        const firstBid = count_balance;
        let secondBid = gameBet - firstBid;
        if (this.betRemains0) {
          secondBid = this.betRemains0;
        }
        const bankSum = (firstBid / 100) * this.GetPercent();
        sum = bankSum + secondBid;
        bankBonusSum = (firstBid / 100) * prc_b;
      } else if (count_balance > 0) {
        bankBonusSum = (gameBet / 100) * prc_b;
      }

      for (let i = 0; i < this.jpgs.length; i++) {
        if (!this.jpgPercentZero) {
          if (count_balance < gameBet && count_balance > 0) {
            this.toSlotJackBanks +=
              (count_balance / 100) * this.jpgs[i].percent;
          } else if (count_balance > 0) {
            this.toSlotJackBanks += (gameBet / 100) * this.jpgs[i].percent;
          }
        }
      }
      this.toGameBanks = sum;
      this.betProfit =
        gameBet - this.toGameBanks - this.toSlotJackBanks - this.toSysJackBanks;
    }
    if (sum > 0) {
      this.toGameBanks = sum;
    }
    if (bankBonusSum > 0) {
      sum -= bankBonusSum;
      this.Bank += bankBonusSum; // Approximation
    }
    if (sum == 0 && slotEvent == "bet" && this.betRemains) {
      sum = this.betRemains;
    }
    this.Bank += sum; // Approximation
    return game;
  }

  public SetBalance(sum: number, slotEvent: string = ""): IUser {
    if (this.GetBalance() + sum < 0) {
      this.InternalError("Balance_   " + sum);
    }
    sum = sum * this.CurrentDenom;
    if (sum < 0 && slotEvent == "bet") {
      const user = this.user;
    }

    this.user.balance = Number(this.user.balance) + sum;
    this.user.balance = this.FormatFloat(this.user.balance);
    return this.user;
  }

  public GetBalance(): number {
    return Number(this.user.balance) / this.CurrentDenom;
  }

  public SaveLogReport(
    spinSymbols: string,
    bet: number,
    lines: number,
    win: number,
    slotState: string
  ): void {
    if (this.isStateless) return;
  }

  public GetSpinSettings(
    garantType: string = "bet",
    bet: number,
    lines: number
  ): any[] {
    let curField = 10;
    switch (lines) {
      case 10:
        curField = 10;
        break;
      case 9:
      case 8:
        curField = 9;
        break;
      case 7:
      case 6:
        curField = 7;
        break;
      case 5:
      case 4:
        curField = 5;
        break;
      case 3:
      case 2:
        curField = 3;
        break;
      case 1:
        curField = 1;
        break;
      default:
        curField = 10;
        break;
    }
    let pref = "";
    if (garantType != "bet") {
      pref = "_bonus";
    } else {
      pref = "";
    }
    this.AllBet = bet * lines;

    let linesPercentConfigSpin: any = {};
    let linesPercentConfigBonus: any = {};
    try {
      linesPercentConfigSpin = JSON.parse(this.game.lines_percent_config_spin);
      linesPercentConfigBonus = JSON.parse(
        this.game.lines_percent_config_bonus
      );
    } catch (e) {}

    const currentPercent = this.shop.percent;
    let currentSpinWinChance = 0;
    let currentBonusWinChance = 0;
    let percentLevel = "";

    if (linesPercentConfigSpin["line" + curField + pref]) {
      for (const k in linesPercentConfigSpin["line" + curField + pref]) {
        const v = linesPercentConfigSpin["line" + curField + pref][k];
        const l = k.split("_");
        const l0 = Number(l[0]);
        const l1 = Number(l[1]);
        if (l0 <= Number(currentPercent) && Number(currentPercent) <= l1) {
          percentLevel = k;
          break;
        }
      }
      currentSpinWinChance =
        linesPercentConfigSpin["line" + curField + pref][percentLevel];
      currentBonusWinChance =
        linesPercentConfigBonus["line" + curField + pref][percentLevel];
    }

    const RtpControlCount = 200;
    if (!this.HasGameDataStatic("SpinWinLimit")) {
      this.SetGameDataStatic("SpinWinLimit", 0);
    }
    if (!this.HasGameDataStatic("RtpControlCount")) {
      this.SetGameDataStatic("RtpControlCount", RtpControlCount);
    }
    let rtpRange = 0;
    if (this.game.stat_in > 0) {
      rtpRange = (this.game.stat_out / this.game.stat_in) * 100;
    }

    if (this.GetGameDataStatic("RtpControlCount") == 0) {
      if (
        Number(currentPercent) + PhpHelpers.rand(1, 2) < rtpRange &&
        this.GetGameDataStatic("SpinWinLimit") <= 0
      ) {
        this.SetGameDataStatic("SpinWinLimit", PhpHelpers.rand(25, 50));
      }
      if (pref == "" && this.GetGameDataStatic("SpinWinLimit") > 0) {
        currentBonusWinChance = 5000;
        currentSpinWinChance = 20;
        this.MaxWin = PhpHelpers.rand(1, 5);
        if (rtpRange < Number(currentPercent) - 1) {
          this.SetGameDataStatic("SpinWinLimit", 0);
          this.SetGameDataStatic(
            "RtpControlCount",
            this.GetGameDataStatic("RtpControlCount") - 1
          );
        }
      }
    } else if (this.GetGameDataStatic("RtpControlCount") < 0) {
      if (
        Number(currentPercent) + PhpHelpers.rand(1, 2) < rtpRange &&
        this.GetGameDataStatic("SpinWinLimit") <= 0
      ) {
        this.SetGameDataStatic("SpinWinLimit", PhpHelpers.rand(25, 50));
      }
      this.SetGameDataStatic(
        "RtpControlCount",
        this.GetGameDataStatic("RtpControlCount") - 1
      );
      if (pref == "" && this.GetGameDataStatic("SpinWinLimit") > 0) {
        currentBonusWinChance = 5000;
        currentSpinWinChance = 20;
        this.MaxWin = PhpHelpers.rand(1, 5);
        if (rtpRange < Number(currentPercent) - 1) {
          this.SetGameDataStatic("SpinWinLimit", 0);
        }
      }
      if (
        this.GetGameDataStatic("RtpControlCount") < -1 * RtpControlCount &&
        Number(currentPercent) - 1 <= rtpRange &&
        rtpRange <= Number(currentPercent) + 2
      ) {
        this.SetGameDataStatic("RtpControlCount", RtpControlCount);
      }
    } else {
      this.SetGameDataStatic(
        "RtpControlCount",
        this.GetGameDataStatic("RtpControlCount") - 1
      );
    }

    const bonusWin = PhpHelpers.rand(1, currentBonusWinChance);
    const spinWin = PhpHelpers.rand(1, currentSpinWinChance);
    let returnVal: any[] = ["none", 0];

    if (bonusWin == 1 && this.slotBonus) {
      this.isBonusStart = true;
      garantType = "bonus";
      let winLimit = this.GetBank(garantType);
      returnVal = ["bonus", winLimit];
      if (
        this.game.stat_in < this.CheckBonusWin() * bet + this.game.stat_out ||
        winLimit < this.CheckBonusWin() * bet
      ) {
        returnVal = ["none", 0];
      }
    } else if (spinWin == 1) {
      let winLimit = this.GetBank(garantType);
      returnVal = ["win", winLimit];
    }
    if (garantType == "bet" && this.GetBalance() <= 2 / this.CurrentDenom) {
      const randomPush = PhpHelpers.rand(1, 10);
      if (randomPush == 1) {
        let winLimit = this.GetBank("");
        returnVal = ["win", winLimit];
      }
    }
    return returnVal;
  }

  public getNewSpin(
    game: any,
    spinWin: any = 0,
    bonusWin: any = 0,
    lines: any,
    garantType: string = "bet"
  ): string {
    let curField = 10;
    switch (lines) {
      case 10:
        curField = 10;
        break;
      case 9:
      case 8:
        curField = 9;
        break;
      case 7:
      case 6:
        curField = 7;
        break;
      case 5:
      case 4:
        curField = 5;
        break;
      case 3:
      case 2:
        curField = 3;
        break;
      case 1:
        curField = 1;
        break;
      default:
        curField = 10;
        break;
    }
    let pref = "";
    if (garantType != "bet") {
      pref = "_bonus";
    } else {
      pref = "";
    }
    let win: any = [];
    if (spinWin) {
      if (game.game_win && game.game_win["winline" + pref + curField]) {
        win = game.game_win["winline" + pref + curField].split(",");
      }
    }
    if (bonusWin) {
      if (game.game_win && game.game_win["winbonus" + pref + curField]) {
        win = game.game_win["winbonus" + pref + curField].split(",");
      }
    }
    const number = PhpHelpers.rand(0, win.length - 1);
    return win[number];
  }

  public GetRandomScatterPos(rp: number[]): number {
    let rpResult: number[] = [];
    for (let i = 0; i < rp.length; i++) {
      if (rp[i] == 0) {
        if (rp[i + 1] !== undefined && rp[i - 1] !== undefined) {
          rpResult.push(i);
        }
        if (rp[i - 1] !== undefined && rp[i - 2] !== undefined) {
          rpResult.push(i - 1);
        }
        if (rp[i + 1] !== undefined && rp[i + 2] !== undefined) {
          rpResult.push(i + 1);
        }
      }
    }

    for (let i = rpResult.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rpResult[i], rpResult[j]] = [rpResult[j], rpResult[i]];
    }

    if (rpResult[0] === undefined) {
      rpResult[0] = PhpHelpers.rand(2, rp.length - 3);
    }
    return rpResult[0];
  }

  public GetGambleSettings(): number {
    const spinWin = PhpHelpers.rand(1, this.WinGamble);
    return spinWin;
  }

  public GetReelStrips(winType: string, slotEvent: string): any {
    const game = this.game;

    let prs: { [key: number]: number } = {};
    let reelsId: number[] = [];

    if (winType != "bonus") {
      const strips = [
        "reelStrip1",
        "reelStrip2",
        "reelStrip3",
        "reelStrip4",
        "reelStrip5",
        "reelStrip6",
      ];
      strips.forEach((reelStrip, index) => {
        const stripData = (this as any)[reelStrip];
        if (Array.isArray(stripData) && stripData.length > 0) {
          prs[index + 1] = PhpHelpers.rand(0, stripData.length - 3);
        }
      });
    } else {
      const strips = [
        "reelStrip1",
        "reelStrip2",
        "reelStrip3",
        "reelStrip4",
        "reelStrip5",
        "reelStrip6",
      ];
      strips.forEach((reelStrip, index) => {
        const stripData = (this as any)[reelStrip];
        if (Array.isArray(stripData) && stripData.length > 0) {
          prs[index + 1] = this.GetRandomScatterPos(stripData);
          reelsId.push(index + 1);
        }
      });

      const scattersCnt = PhpHelpers.rand(3, reelsId.length);
      for (let i = reelsId.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [reelsId[i], reelsId[j]] = [reelsId[j], reelsId[i]];
      }

      for (let i = 0; i < reelsId.length; i++) {
        if (i < scattersCnt) {
          prs[reelsId[i]] = this.GetRandomScatterPos(
            (this as any)["reelStrip" + reelsId[i]]
          );
        } else {
          const stripData = (this as any)["reelStrip" + reelsId[i]];
          prs[reelsId[i]] = PhpHelpers.rand(0, stripData.length - 3);
        }
      }
    }

    let reel: any = {
      rp: [],
    };

    for (const index in prs) {
      const value = prs[index];
      const key = [...(this as any)["reelStrip" + index]];
      const cnt = key.length;

      const getVal = (idx: number) => {
        if (idx < 0) return key[cnt + idx];
        if (idx >= cnt) return key[idx % cnt];
        return key[idx];
      };

      reel["reel" + index] = [];
      reel["reel" + index][0] = getVal(value - 1);
      reel["reel" + index][1] = getVal(value);
      reel["reel" + index][2] = getVal(value + 1);
      reel["reel" + index][3] = "";
      reel["rp"].push(value);
    }

    return reel;
  }
}
