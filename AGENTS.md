# High-Risk Migration Instructions: PHP to TypeScript

This is a high-risk migration. The game client (likely Flash or a legacy JS engine) is expecting a very specific, brittle string format. Even a minor change—like a different URL encoding of a space character, a missing ampersand, or changed key order—will cause the client to parse the data incorrectly and crash.

Your task is to convert the PHP game logic (specifically `Server.php` and `SlotSettings.php`) into TypeScript, adhering to the "Stateless" architecture provided in the base files.

### **Core Philosophy: "Port Logic, Do Not Refactor"**

Do not try to improve the code. Do not try to make it "cleaner." If the PHP code does something inefficiently (like manual string concatenation instead of using objects), **replicate that inefficiency exactly** in TypeScript. Your goal is identical output, not better code.

---

### **Step 0: Use the Provided Architecture**

Do not create data models from scratch. You MUST import the shared logic from the `typescript_base` directory.

1.  **Base Models**: The following classes are already converted and available. Import them:
    - `StatelessModel` (Base class)
    - `User`, `Game`, `Shop`, `JPG`, `GameBank`, `GameLog`
    - **Location**: `../typescript_base/<filename>`
2.  **Helper Functions**: Use the provided `PhpHelpers` for math and time.
    - **Location**: `../typescript_base/php_helpers`
3.  **Interfaces**: Use `IContext` to type the incoming data.
    - **Location**: `../typescript_base/interfaces`

**Example Import:**

```typescript
import { SlotSettings } from './SlotSettings';
import { IContext } from '../typescript_base/interfaces';
import { PhpHelpers } from '../typescript_base/php_helpers';
import { User } from '../typescript_base/user';
import { Game } from '../typescript_base/game';
Step 1: Study the Data & Golden Master
Golden Master: We have provided a fully converted example in typescript_example.

Source PHP: conversion_the_last/php_files/CreatureFromTheBlackLagoonNET/

Result TS: conversion_the_last/typescript_example/

Action: Compare Server.php and Server.ts. Note specifically how long query strings are manually concatenated.

Data Structure: See the "Context Data Examples" section at the bottom of this file.

Note: Fields like lines_percent_config_spin in the Game object are often JSON strings that need parsing, not direct objects.

Note: Monetary values often arrive as strings ("100.00") and must be cast to numbers before calculation.

Step 2: Create the "PHP Compatibility" Layer
Ensure you use the provided PhpHelpers class for the following:

The rand Function:

Importance: Critical. PHP’s rand($min, $max) is inclusive of both bounds. JavaScript’s Math.random() logic often excludes the max if not written carefully.

Usage: PhpHelpers.rand(min, max)

Step 3: Converting SlotSettings.ts
This file acts as the configuration database.

Inheritance: Your SlotSettings class should NOT extend StatelessModel. It is a logic controller that uses the User and Game models.

The Paytable Array:

Instruction: Copy the array definition verbatim. Do not reformat the indentation if it helps you visually verify against the PHP original. Ensure keys like 'SYM_0' are strings, not numbers.

GetReelStrips Logic:

This function relies heavily on logic that varies by game. Port it line-by-line.

Input: Ensure the reel object returned has the exact same structure: {'reel1': [...], 'rp': [...]}.

Step 4: Converting Server.ts (The "Danger Zone")
This is where the client response is built. This requires surgical precision.

A. The Massive Switch Statement
The PHP code uses a switch( $aid ) to handle actions (init, spin, etc.). Keep this structure.

B. The "Long Response Strings" (CRITICAL)
In PHP, you see lines like:

PHP

$curReels = '&rs.i0.r.i0.syms=SYM' . $reels->reel1[0] . '%2CSYM' . ...
Rule 1: Do NOT Use URLSearchParams or Object Builders

Incorrect TS Approach: Creating an object { "rs.i0...": "..." } and using a library to stringify it.

Why it fails: Libraries might encode characters differently (e.g., %20 vs +), change the order of keys, or double-encode special characters. The client likely parses this manually and expects specific delimiters.

Rule 2: Use Template Literals for Manual Concatenation

Copy the PHP string parts exactly into TS template literals.

PHP: '&rs.i0.r.i0.syms=SYM' . $reels->reel1[0]

TS: '&rs.i0.r.i0.syms=SYM' + reels.reel1[0]

Rule 3: Watch for Escaped Characters

Look closely at %2C (comma) and %26 (ampersand). Ensure these remain exactly as written in the string. Do not decode them to , or &.

C. JSON Construction
In places where the PHP code manually builds JSON:

PHP

$response = '{"responseEvent":"error", ...}';
Instruction: Copy this string exactly into TypeScript.

Do not write const response = { responseEvent: "error" ... }; return JSON.stringify(response);.

Reason: JSON.stringify does not guarantee key order. Legacy clients often use Regex or substring searching to find values, meaning key order matters.

Step 5: Logic Parity Checks
Implicit Type Conversion:

PHP: $postData['bet_denomination'] might come in as a string "0.05" but is used as a number.

TS: You must explicitly cast inputs: parseFloat(postData['bet_denomination']).

Variable Scope:

PHP variables declared inside switch or if blocks are available outside them. TS let/const are block-scoped.

Instruction: Declare all variables ($lines, $betline, $totalWin) at the top of the function function (using let) to mimic PHP's function-scoping rules.

Summary Checklist
[ ] Imports: Used models from typescript_base.

[ ] Data: Paytable and Lines arrays copied verbatim.

[ ] Scope: Variables declared at function scope, not block scope.

[ ] Strings: Long query strings are concatenated manually, not built via objects.

[ ] Types: Inputs (postData) are explicitly cast to Number before math operations.

Appendix: Context Data Examples
Use these JSON examples to understand the structure of the data passed into SlotSettings.


Game Object Example:
  {
    "id": 877,
    "name": "CreatureFromTheBlackLagoonNET",
    "title": "Creature From The Black Lagoon",
    "shop_id": 0,
    "jpg_id": 0,
    "label": null,
    "device": 2,
    "gamebank": "slots",
    "lines_percent_config_spin": "{\"line1\":{\"74_80\":\"15\",\"82_88\":\"9\",\"90_96\":\"7\"},\"line3\":{\"74_80\":\"15\",\"82_88\":\"9\",\"90_96\":\"7\"},\"line5\":{\"74_80\":\"12\",\"82_88\":\"8\",\"90_96\":\"6\"},\"line7\":{\"74_80\":\"12\",\"82_88\":\"8\",\"90_96\":\"6\"},\"line9\":{\"74_80\":\"10\",\"82_88\":\"7\",\"90_96\":\"5\"},\"line10\":{\"74_80\":\"10\",\"82_88\":\"7\",\"90_96\":\"5\"}}",
    "lines_percent_config_spin_bonus": "{\"line1_bonus\":{\"74_80\":\"15\",\"82_88\":\"9\",\"90_96\":\"7\"},\"line3_bonus\":{\"74_80\":\"15\",\"82_88\":\"9\",\"90_96\":\"7\"},\"line5_bonus\":{\"74_80\":\"12\",\"82_88\":\"8\",\"90_96\":\"6\"},\"line7_bonus\":{\"74_80\":\"12\",\"82_88\":\"8\",\"90_96\":\"6\"},\"line9_bonus\":{\"74_80\":\"10\",\"82_88\":\"7\",\"90_96\":\"5\"},\"line10_bonus\":{\"74_80\":\"10\",\"82_88\":\"7\",\"90_96\":\"5\"}}",
    "lines_percent_config_bonus": "{\"line1\":{\"74_80\":\"100\",\"82_88\":\"50\",\"90_96\":\"40\"},\"line3\":{\"74_80\":\"100\",\"82_88\":\"50\",\"90_96\":\"40\"},\"line5\":{\"74_80\":\"100\",\"82_88\":\"50\",\"90_96\":\"40\"},\"line7\":{\"74_80\":\"50\",\"82_88\":\"40\",\"90_96\":\"30\"},\"line9\":{\"74_80\":\"50\",\"82_88\":\"40\",\"90_96\":\"30\"},\"line10\":{\"74_80\":\"50\",\"82_88\":\"40\",\"90_96\":\"30\"}}",
    "lines_percent_config_bonus_bonus": "{\"line1_bonus\":{\"74_80\":\"100\",\"82_88\":\"50\",\"90_96\":\"40\"},\"line3_bonus\":{\"74_80\":\"100\",\"82_88\":\"50\",\"90_96\":\"40\"},\"line5_bonus\":{\"74_80\":\"100\",\"82_88\":\"50\",\"90_96\":\"40\"},\"line7_bonus\":{\"74_80\":\"50\",\"82_88\":\"40\",\"90_96\":\"30\"},\"line9_bonus\":{\"74_80\":\"50\",\"82_88\":\"40\",\"90_96\":\"30\"},\"line10_bonus\":{\"74_80\":\"50\",\"82_88\":\"40\",\"90_96\":\"30\"}}",
    "rezerv": "4",
    "cask": "",
    "advanced": "",
    "bet": "0.01, 0.02, 0.05, 0.10, 0.20",
    "scaleMode": "",
    "slotViewState": "",
    "view": 1,
    "denomination": 1,
    "category_temp": null,
    "original_id": 877,
    "bids": 0,
    "stat_in": 0,
    "stat_out": 0,
    "created_at": "2020-01-30 00:00:00",
    "updated_at": "2021-01-18 15:58:10",
    "current_rtp": 0,
    "rtp_stat_in": 0,
    "rtp_stat_out": 0
  }

User Object Example:
    {
        "id": 8,
        "email": "asdf123@asdf.com",
        "username": "asdf123",
        "password": "$2y$10$wBHTDz5A/vY4AI5KxbGCZuEb2EAqA/0jHxy.E7LjwoAAJJkFEadmq",
        "parent_id": 0,
        "inviter_id": 0,
        "first_name": null,
        "last_name": null,
        "phone": null,
        "phone_verified": 0,
        "rating": 0.0000,
        "avatar": null,
        "address": null,
        "role_id": 1,
        "shop_id": 1,
        "birthday": null,
        "balance": 0.0000,
        "tournaments": 0.0000,
        "happyhours": 0.0000,
        "refunds": 0.0000,
        "progress": 0.0000,
        "daily_entries": 0.0000,
        "invite": 0.0000,
        "welcomebonus": 0.0000,
        "smsbonus": 0.0000,
        "wheelfortune": 0.0000,
        "count_balance": 0.0000,
        "count_tournaments": 0.0000,
        "count_happyhours": 0.0000,
        "count_refunds": 0.0000,
        "count_progress": 0.0000,
        "count_daily_entries": 0.0000,
        "count_invite": 0.0000,
        "count_welcomebonus": 0.0000,
        "count_smsbonus": 0.0000,
        "count_wheelfortune": 0.0000,
        "total_in": 0,
        "total_out": 0,
        "last_login": "2025-12-06 08:13:44.195772",
        "confirmation_token": null,
        "sms_token": null,
        "sms_token_date": null,
        "status": "Active",
        "is_blocked": 0,
        "is_demo_agent": 0,
        "agreed": 0,
        "free_demo": 0,
        "remember_token": "jigwEOcAlV7ppX5T8iFLDAwmoKZgAJvlFtgYsJKvRsm3BdUFPl7ZYILd0nhB",
        "api_token": null,
        "auth_token": null,
        "google2fa_enable": 0,
        "google2fa_secret": null,
        "language": "en",
        "session": null,
        "last_online": "2025-12-06 09:14:59",
        "last_bid": "2025-12-06 08:13:44.195772",
        "last_progress": "2025-12-06 08:13:44.195772",
        "last_daily_entry": "2025-12-04 09:13:44",
        "last_wheelfortune": "2025-12-06 08:13:44.195772",
        "created_at": "2025-12-06 09:13:44",
        "updated_at": "2025-12-06 09:14:59"
    }


Shop Object Example:
{
    "id": 1,
    "name": "shop",
    "balance": 1999995000.0000,
    "frontend": "Warmest",
    "currency": "USD",
    "percent": 74,
    "max_win": 100,
    "shop_limit": 500,
    "is_blocked": 0,
    "access": 0,
    "country": "[\"Albania\"]",
    "os": null,
    "device": null,
    "orderby": "RTP",
    "user_id": 3,
    "pending": 0,
    "rules_terms_and_conditions": 0,
    "rules_privacy_policy": 0,
    "rules_general_bonus_policy": 0,
    "rules_why_bitcoin": 0,
    "rules_responsible_gaming": 0,
    "happyhours_active": 1,
    "progress_active": 0,
    "invite_active": 1,
    "welcome_bonuses_active": 1,
    "sms_bonuses_active": 1,
    "wheelfortune_active": 1
}
```
