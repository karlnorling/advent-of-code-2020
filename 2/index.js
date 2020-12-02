/*
To try to debug the problem, they have created a list
(your puzzle input) of passwords (according to the corrupted database)
and the corporate policy when that password was set.

For example, suppose you have the following list:

"1-3 a": "abcde" (one to 3 times letter "a" to be valid)
"1-3 b": "cdefg" (one to 3 time the letter "b" to be valid)
"2-9 c": "ccccccccc" (two to nine times the letter "c" to be valid)
,
Each line gives the password policy and then the password.
The password policy indicates the lowest and highest number
of times a given letter must appear for the password to be valid.
For example, 1-3 a means that the password must contain a at least
1 time and at most 3 times.

In the above example, 2 passwords are valid. The middle password,
cdefg, is not; it contains no instances of b, but needs at least 1.
The first and third passwords are valid: they contain one a or nine c,
both within the limits of their respective policies.

How many passwords are valid according to their policies?
*/

const fs = require('fs')
const validPasswords = [];

try {
  const data = fs.readFileSync('data.txt', 'utf8');
  data.split('\n').forEach(row => {
    const [key, value] = row.split(':');
    const regex = /(\d+)-(\d+) ([a-z+])/gm;
    const matches = key.matchAll(regex);
    for (const match of matches) {
      const [discard, min, max, char] = match;
      console.log(`Validating password ${value} with following rule:\nmin: ${min}\nmax: ${max}\nchar: ${char}`);
      const regex = new RegExp(char, "g");
      const result = (value.match(regex) || []).length;  
      const valid = result >= min && result <= max;
      if (valid) {
        console.log(`Password: ${value} is valid\n\n`);
        validPasswords.push(value);
      } else {
        console.log(`Password: ${value} is not valid\n\n`);
      }
    }
  });
} catch (err) {
  console.error(err)
}

console.log(`Found: ${validPasswords.length} valid passwords`);


console.log(`###################################################################`);
console.log(`###################################################################`);
console.log(`###################################################################`);
console.log(`###################################################################`);

/*
While it appears you validated the passwords correctly, they don't seem to be 
what the Official Toboggan Corporate Authentication System is expecting.

The shopkeeper suddenly realizes that he just accidentally explained the 
password policy rules from his old job at the sled rental place down the street! 
The Official Toboggan Corporate Policy actually works a little differently.

Each policy actually describes two positions in the password, where 
- 1 means the first character, 
- 2 means the second character, and so on. 
- (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) 
- Exactly one of these positions must contain the given letter. 
- Other occurrences of the letter are irrelevant for the purposes of policy enforcement.

Given the same example list from above:

1-3 a: abcde is valid: position 1 contains a and position 3 does not.
1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.
How many passwords are valid according to the new interpretation of the policies?
*/
const validPasswords2 = [];
try {
  const data = fs.readFileSync('data.txt', 'utf8');
  data.split('\n').forEach(row => {
    const [key, value] = row.split(':');
    const password = value.trim();
    const regex = /(\d+)-(\d+) ([a-z+])/gm;
    const matches = key.matchAll(regex);
    let valid = false;
    for (const match of matches) {
      const [discard, indexA, indexB, char] = match;
      const passwordChars = password.split('');
      const matchA = passwordChars[indexA-1] === char;
      const matchB = passwordChars[indexB-1] === char;
      console.log(`Validating password ${password} with following rule:\nindex a: ${indexA-1}\nindex b: ${indexB-1}\nchar: ${char}`);
      
      if (matchA && matchB) {
        valid = false;
      } else if (matchA || matchB) {
        valid = true;
      }

      if (valid) {
        console.log(`Password: ${password} is valid\n\n`);
        validPasswords2.push(password);
      } else {
        console.log(`Password: ${password} is not valid\n\n`);
      }
    }
  });
} catch (err) {
  console.error(err)
}

console.log(`Found: ${validPasswords2.length} valid passwords`);
