/*
These aren't the only trees, though; due to something you read about once 
involving arboreal genetics and biome stability, the same pattern 
repeats to the right many times:

..##.........##.........##.........##.........##.........##.......  --->
#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....  --->
.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........#.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...##....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#  --->
You start on the open square (.) in the top-left corner and need to 
reach the bottom (below the bottom-most row on your map).

The toboggan can only follow a few specific slopes (you opted for a 
  cheaper model that prefers rational numbers); start by counting all 
  the trees you would encounter for the slope right 3, down 1:

From your starting position at the top-left, check the position that is 
right 3 and down 1. Then, check the position that is right 3 and down 1 
from there, and so on until you go past the bottom of the map.

The locations you'd check in the above example are marked here with O where 
there was an open square and X where there was a tree:

..##.........##.........##.........##.........##.........##.......  --->
#..O#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....X..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#O#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..X...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.X#.......#.##.......#.##.......#.##.......#.##.....  --->
.#.#.#....#.#.#.#.O..#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........X.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.X#...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...#X....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...X.#.#..#...#.#.#..#...#.#.#..#...#.#  --->
In this example, traversing the map using this slope would cause you to encounter 7 trees.

Starting at the top-left corner of your map and following a slope of 
right 3 and down 1, how many trees would you encounter?
*/

const fs = require('fs')
let trees = 0;
const plots = {};
let x = 0;

try {
  const data = fs.readFileSync('data.txt', 'utf8');
  data.split('\n').forEach((row, y) => {
    let isTree = false;
    const plots = row.split('');
    if (y > 0) {
      x +=3;
      if (x >= plots.length) {
        x = x % plots.length;
      }
      isTree = plots[x] === '#';
      if (isTree) {
        trees++;
      }
    }
  });
} catch (err) {
  console.error(err)
}

console.log(`Found ${trees} trees`);

/*
Time to check the rest of the slopes - you need to minimize 
the probability of a sudden arboreal stop, after all.

Determine the number of trees you would encounter if, for each 
of the following slopes, you start at the top-left corner and 
traverse the map all the way to the bottom:

Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.
In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; 
multiplied together, these produce the answer 336.

What do you get if you multiply together the number of 
trees encountered on each of the listed slopes?
*/


try {
  const data = fs.readFileSync('data.txt', 'utf8');
  const treeMap = data.split("\n").map((row) => row.trim().split(""));
  const mapEnd = treeMap.length;
  const rowEnd = treeMap[0].length;
  const paths = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  const treeCounts = [];

  for (const path of paths) {
    const [xAdd, yAdd] = path;
    currentLevel = 1;
    treesFound = 0;
    x = 0;
    y = 0;
  
    while (currentLevel < mapEnd) {
      x += xAdd;
      y += yAdd;
  
      if (x >= rowEnd) {
        x = x % rowEnd;
      }
  
      if (treeMap[y][x] === "#") {
        treesFound += 1;
      }
  
      currentLevel += yAdd;
    }
  
    treeCounts.push(treesFound);
  }
  
  const treeTotal = treeCounts.reduce((a, b) => a * b, 1);
  
  console.log(`Found ${treeTotal} trees`);
} catch (err) {
  console.error(err)
}
