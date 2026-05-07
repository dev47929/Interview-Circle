export const boilerplates = {
  'rotating-the-box': {
    javascript: `/**
 * @param {character[][]} box
 * @return {character[][]}
 */
var rotateTheBox = function(box) {
    
};`,
    python: `class Solution:
    def rotateTheBox(self, box):
        pass`,
    cpp: `#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<char>> rotateTheBox(vector<vector<char>>& box) {
        
    }
};`,
    java: `class Solution {
    public char[][] rotateTheBox(char[][] box) {
        
    }
}`
  },
  'jump-game-ix': {
    javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var jumpGameIX = function(nums) {
    
};`,
    python: `class Solution:
    def jumpGameIX(self, nums: List[int]) -> List[int]:
        pass`,
    cpp: `#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> jumpGameIX(vector<int>& nums) {
        
    }
};`,
    java: `class Solution {
    public int[] jumpGameIX(int[] nums) {
        
    }
}`
  },
  'median-of-two-sorted-arrays': {
    javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    
};`,
    python: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        pass`,
    cpp: `#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        
    }
};`,
    java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        
    }
}`
  }
};

export const languages = [
  { id: 'javascript', name: 'JavaScript', icon: 'JS' },
  { id: 'python', name: 'Python', icon: 'PY' },
  { id: 'java', name: 'Java', icon: 'JV' },
  { id: 'cpp', name: 'C++', icon: 'C+' },
  { id: 'ruby', name: 'Ruby', icon: 'RB' },
  { id: 'go', name: 'Go', icon: 'GO' }
];

export const questionData = {
  'rotating-the-box': {
    title: "Rotating the Box",
    difficulty: "Medium",
    category: "Technical",
    company: "Amazon",
    description: `You are given an m x n matrix of characters boxGrid representing a side-view of a box. Each cell of the box is one of the following:

- A stone '#'
- A stationary obstacle '*'
- Empty '.'

The box is rotated 90 degrees clockwise, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, another stone, or the bottom of the box. Gravity does not affect the obstacles' positions, and the inertia from the box's rotation does not affect the stones' horizontal positions.

It is guaranteed that each stone in boxGrid rests on an obstacle, another stone, or the bottom of the box.

Return an n x m matrix representing the box after the rotation described above.`,
    examples: [
      {
        input: 'boxGrid = [["#",".","#"]]',
        output: '[["."], ["#"], ["#"]]',
        explanation: 'The box is rotated 90 degrees clockwise and gravity causes the stones to fall.'
      },
      {
        input: 'boxGrid = [["#",".","*","."], ["#","#","*","."]]',
        output: '[["#","."], ["#","#"], ["*","*"], [".","."]]',
        explanation: 'Stones fall until they hit obstacles or the bottom.'
      }
    ],
    constraints: [
      "m == boxGrid.length",
      "n == boxGrid[i].length",
      "1 <= m, n <= 500",
      "boxGrid[i][j] is either '#', '*', or '.'."
    ],
    testCases: [
      {
        input: '5 10',
        expectedOutput: '15'
      },
      {
        input: '1 2',
        expectedOutput: '3'
      }
    ]
  },
  'jump-game-ix': {
    title: "Jump Game IX",
    difficulty: "Medium",
    category: "DSA",
    description: `You are given an integer array nums.

From any index i, you can jump to another index j under the following rules:

- Jump to index j where j > i is allowed only if nums[j] < nums[i].
- Jump to index j where j < i is allowed only if nums[j] > nums[i].

For each index i, find the maximum value in nums that can be reached by following any sequence of valid jumps starting at i.

Return an array ans where ans[i] is the maximum value reachable starting from index i.`,
    examples: [
      {
        input: 'nums = [2,1,3]',
        output: '[2,2,3]',
        explanation: 'For i = 0: No jump increases the value. For i = 1: Jump to j = 0 as nums[j] = 2 is greater than nums[i]. For i = 2: Since nums[2] = 3 is the maximum value in nums, no jump increases the value.'
      },
      {
        input: 'nums = [2,3,1]',
        output: '[3,3,3]',
        explanation: 'For i = 0: Jump forward to j = 2 as nums[j] = 1 is less than nums[i] = 2, then from i = 2 jump to j = 1 as nums[j] = 3 is greater than nums[2].'
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "1 <= nums[i] <= 10^9"
    ],
    testCases: [
      {
        input: '[2,1,3]',
        expectedOutput: '[2,2,3]'
      },
      {
        input: '[2,3,1]',
        expectedOutput: '[3,3,3]'
      }
    ]
  },
  'median-of-two-sorted-arrays': {
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "DSA",
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.'
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '2.50000',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.'
      }
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    testCases: [
      {
        input: '[1,3], [2]',
        expectedOutput: '2.00000'
      },
      {
        input: '[1,2], [3,4]',
        expectedOutput: '2.50000'
      }
    ]
  }
};

export const questionBankList = [
  { id: 'rotating-the-box', title: "Rotating the Box", difficulty: "Medium", category: "DSA", solved: false, company: "Amazon" },
  { id: 'jump-game-ix', title: "Jump Game IX", difficulty: "Medium", category: "DSA", solved: false, company: "Google" },
  { id: 'median-of-two-sorted-arrays', title: "Median of Two Sorted Arrays", difficulty: "Hard", category: "DSA", solved: false, company: "Meta" },
  { id: 'closures-js', title: "Explain the concept of 'Closures' in JavaScript with examples.", difficulty: "Medium", category: "Technical", solved: true, company: "Google" },
  { id: 'conflict-teammate', title: "Tell me about a time you had a conflict with a teammate.", difficulty: "Easy", category: "Behavioral", solved: true, company: "Amazon" },
  { id: 'bitly-design', title: "Design a URL shortening service like Bitly.", difficulty: "Hard", category: "System Design", solved: false, company: "Meta" },
  { id: 'sql-vs-nosql', title: "What is the difference between SQL and NoSQL?", difficulty: "Medium", category: "Database", solved: false, company: "Microsoft" },
  { id: 'slow-react', title: "How would you optimize a slow React application?", difficulty: "Hard", category: "Technical", solved: true, company: "Netflix" },
  { id: 'strengths-weaknesses', title: "What are your greatest strengths and weaknesses?", difficulty: "Easy", category: "Behavioral", solved: true, company: "Apple" },
  { id: 'redux-scratch', title: "Implement a Redux-like state management from scratch.", difficulty: "Hard", category: "Technical", solved: false, company: "Uber" },
  { id: 'notification-system', title: "Design a scalable notification system.", difficulty: "Hard", category: "System Design", solved: false, company: "Google" },
  { id: 'db-normalization', title: "Explain database normalization and its forms.", difficulty: "Medium", category: "Database", solved: true, company: "Amazon" },
  { id: 'binary-search-impl', title: "Implement Binary Search from scratch.", difficulty: "Easy", category: "DSA", solved: false, company: "Google" },
  { id: 'reverse-linked-list', title: "Reverse a Singly Linked List.", difficulty: "Easy", category: "DSA", solved: false, company: "Microsoft" },
  { id: 'two-sum', title: "Two Sum Problem.", difficulty: "Easy", category: "DSA", solved: true, company: "Amazon" },
  { id: 'valid-parentheses', title: "Check for Valid Parentheses.", difficulty: "Easy", category: "DSA", solved: true, company: "Meta" },
  { id: 'merge-k-sorted', title: "Merge k Sorted Lists.", difficulty: "Hard", category: "DSA", solved: false, company: "Amazon" },
  { id: 'lru-cache', title: "Design and implement LRU Cache.", difficulty: "Hard", category: "DSA", solved: false, company: "Apple" },
];
