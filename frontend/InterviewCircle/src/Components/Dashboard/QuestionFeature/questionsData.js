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
  },
  'closures-js': {
    javascript: `/**
 * @param {string} concept
 * @return {void}
 */
function explainClosure() {
    // Write your example here
}`,
  },
  'two-sum': {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        pass`,
  },
  'reverse-linked-list': {
    javascript: `/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    
};`,
    python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        pass`,
  },
  'binary-search-impl': {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    
};`,
    python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        pass`,
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
  },
  'closures-js': {
    title: "Explain Closures",
    difficulty: "Medium",
    category: "Technical",
    company: "Google",
    description: "Explain the concept of 'Closures' in JavaScript with examples. How do they work under the hood with lexical scoping?",
    examples: [
      {
        input: "function outer() { let x = 10; return function inner() { console.log(x); } }",
        output: "10",
        explanation: "The inner function retains access to the variable x even after outer has finished executing."
      }
    ],
    constraints: ["Explain with code snippets", "Mention use cases like data privacy"],
    testCases: []
  },
  'two-sum': {
    title: "Two Sum",
    difficulty: "Easy",
    category: "DSA",
    company: "Amazon",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
    testCases: []
  },
  'reverse-linked-list': {
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "DSA",
    company: "Microsoft",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "The list is reversed from 1->2->3->4->5 to 5->4->3->2->1."
      }
    ],
    constraints: ["The number of nodes in the list is the range [0, 5000].", "-5000 <= Node.val <= 5000"],
    testCases: []
  },
  'binary-search-impl': {
    title: "Implement Binary Search",
    difficulty: "Easy",
    category: "DSA",
    company: "Google",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4"
      }
    ],
    constraints: ["1 <= nums.length <= 10^4", "-10^4 < nums[i], target < 10^4", "All the integers in nums are unique.", "nums is sorted in ascending order."],
    testCases: []
  },
  'conflict-teammate': {
    title: "Conflict with Teammate",
    difficulty: "Easy",
    category: "Behavioral",
    company: "Amazon",
    description: "Tell me about a time you had a conflict with a teammate. How did you resolve it?",
    examples: [],
    constraints: [],
  },
  'bitly-design': {
    title: "Design Bitly",
    difficulty: "Hard",
    category: "System Design",
    company: "Meta",
    description: "Design a URL shortening service like Bitly. Focus on scalability and URL redirection.",
    requirements: [
      "Shorten a long URL to a unique short alias",
      "Redirect short URL to original URL",
      "High availability and low latency",
      "Support custom aliases",
      "URLs should expire after a default time"
    ],
    constraints: [
      "100M new URLs per month",
      "10:1 read-to-write ratio",
      "6 characters for the short URL",
      "Short URLs should be base62 encoded"
    ],
    scale: {
      writes: "40/sec",
      reads: "400/sec",
      storage: "15TB over 5 years"
    }
  },
  'sql-vs-nosql': {
    title: "SQL vs NoSQL",
    difficulty: "Medium",
    category: "Database",
    company: "Microsoft",
    description: "What is the difference between SQL and NoSQL? When would you use one over the other?",
    examples: [],
    constraints: [],
  },
  'slow-react': {
    title: "Optimize Slow React App",
    difficulty: "Hard",
    category: "Technical",
    company: "Netflix",
    description: "How would you optimize a slow React application? Mention memoization, code splitting, and profiling.",
    examples: [],
    constraints: [],
  },
  'strengths-weaknesses': {
    title: "Strengths and Weaknesses",
    difficulty: "Easy",
    category: "Behavioral",
    company: "Apple",
    description: "What are your greatest strengths and weaknesses? How do you work on your weaknesses?",
    examples: [],
    constraints: [],
  },
  'redux-scratch': {
    title: "Redux from Scratch",
    difficulty: "Hard",
    category: "Technical",
    company: "Uber",
    description: "Implement a Redux-like state management from scratch. Focus on createStore, dispatch, and subscribe.",
    examples: [],
    constraints: [],
  },
  'notification-system': {
    title: "Notification System Design",
    difficulty: "Hard",
    category: "System Design",
    company: "Google",
    description: "Design a scalable notification system. Handle push, email, and SMS notifications.",
    requirements: [
      "Support Push, SMS, and Email notifications",
      "Real-time delivery for critical alerts",
      "Support for bulk notifications (marketing)",
      "User opt-out/preference management",
      "Rate limiting and deduplication"
    ],
    constraints: [
      "Millions of users",
      "High delivery rate (10k+ per second)",
      "Message tracking and analytics",
      "Retry mechanism for failed deliveries"
    ],
    scale: {
      total_users: "50M",
      daily_notifications: "100M",
      peak_load: "20k/sec"
    }
  },
  'db-normalization': {
    title: "Database Normalization",
    difficulty: "Medium",
    category: "Database",
    company: "Amazon",
    description: "Explain database normalization and its forms (1NF, 2NF, 3NF, BCNF).",
    examples: [],
    constraints: [],
  },
  'merge-k-sorted': {
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "DSA",
    company: "Amazon",
    description: "Merge k sorted linked lists and return it as one sorted list.",
    examples: [],
    constraints: [],
  },
  'lru-cache': {
    title: "LRU Cache",
    difficulty: "Hard",
    category: "DSA",
    company: "Apple",
    description: "Design and implement a data structure for Least Recently Used (LRU) cache.",
    examples: [],
    constraints: [],
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
