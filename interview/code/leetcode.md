## 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
```js
var moveZeroes = function(nums) {
    if (nums.length <= 1) {
        return nums;
    }
    let j = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            let t = nums[j];
            nums[j] = nums[i];
            nums[i] = t;
            j++;
        }
    }
};
```

## 盛最多水的区间
```js
var maxArea = function(height) {
    let max = 0;
    let left = 0, right = height.length - 1;
    while (left < right) {
        const w = right - left;
        const h = Math.min(height[right], height[left]);
        max = Math.max(max, w * h);
        if (height[left] > height[right]) {
            right--;
        } else {
            left++;
        }
    }
    return max;
};
```

## 三数之和
```js
var threeSum = function(nums) {
    let length = nums.length;
    nums.sort((a, b) => a - b);
    const ans = [];
    for (let i = 0; i < length; i++) {
        if(nums[i] > 0){
            break;
        }
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        const target = -nums[i];
        let j = i + 1, k = length - 1;
        while (j < k) {
            
            if (nums[j] + nums[k] === target) {
                ans.push([nums[i], nums[j], nums[k]]);
                while (j < k && nums[j] === nums[j + 1]) {
                    j++;
                }
                while (j < k && nums[k] === nums[k - 1]) {
                    k--;
                }
                j++;
                k--;
            } else if (nums[j] + nums[k] > target) {
                k--;
            } else {
                j++;
            }
        }
    }
    return ans;
};
```

## 无重复字符串的最长子串
```js
var lengthOfLongestSubstring = function(s) {
    const length = s.length;
    if (length < 2) {
        return length;
    }
    let res = 1;
    let indexMap = new Map();
    let slow = 0, fast = 1;
    indexMap.set(s[0], 0);

    while (fast < length) {
        if (!indexMap.has(s[fast])) {
            res = Math.max(res, fast - slow + 1);
        } else {
            if (indexMap.get(s[fast]) >= slow) {
                slow = indexMap.get(s[fast]) + 1;
            } else {
                res = Math.max(res, fast - slow + 1);
            }
        }
        indexMap.set(s[fast], fast);
        fast++;
    }
    return res;
};
```

## 和为K的子数组
```js
var subarraySum = function(nums, k) {
    let count = 0;
    let i = 0, length = nums.length;
    while(i < length) {
        let sum = 0;
        for (let j = i; j < nums.length; j++) {
            sum += nums[j];
            if (sum === k) {
                count++;
            }
        }
        i++;
    }
    return count;
};
```

## 最大子数组和
```js
var maxSubArray = function(nums) {
    let dp = Array(nums.length).fill(0);
    dp[0] = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (dp[i-1] < 0) {
            dp[i] = nums[i];
        } else {
            dp[i] = dp[i - 1] + nums[i];
        }
    }
    return Math.max(...dp);
};
```

## 合并区间
```js
var merge = function(intervals) {
    intervals.sort((a, b) => a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);
    let res = []
    let prev = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
        const left = intervals[i][0], right = intervals[i][1];
        if (left >= prev[0] && left <= prev[1]) {
            prev[1] = Math.max(right, prev[1]);
        } else {
            res.push(prev);
            prev = intervals[i];
        }
    }
    if (prev) {
        res.push(prev);
    }
    return res;
};
```

## 反转链表
```js
var reverseList = function(head) {
    let prev = null;
    let cur = head;
    while (cur) {
        const oldNext = cur.next;
        cur.next = prev;
        prev = cur;
        cur = oldNext;
    }
    return prev;
};
```
## 回文链表
```js
var isPalindrome = function(head) {
    const halfNode = (head) => {
        let fast = head, slow = head;
        while (fast.next && fast.next.next) {
            fast = fast.next.next;
            slow = slow.next;
        }
        return slow;
    }
    const reverseList = (head) => {
        let prev = null, cur = head;
        while (cur) {
            const oldNext = cur.next;
            cur.next = prev;
            prev = cur;
            cur = oldNext;
        }
        return prev;
    }
    if (head == null) return true;
    let firstHalfEnd = halfNode(head);
    let secondHalfStart = reverseList(firstHalfEnd.next);
    while (secondHalfStart) {
        if (secondHalfStart.val !== head.val) {
            return false;
        }
        head = head.next;
        secondHalfStart = secondHalfStart.next;
    }
    return true;
};
```

## 合并两个链表
```js
var mergeTwoLists = function(list1, list2) {
    const newList = new ListNode();
    let p1 = list1, p2 = list2, p = newList;
    while (p1 && p2) {
        if (p1.val <= p2.val) {
            p.next = p1;
            p1 = p1.next;
        } else {
            p.next = p2;
            p2 = p2.next;
        }
        p = p.next;
    }
    p.next = p1 ? p1 : p2;
    return newList.next;
};
```

## 删除链表倒数第N个节点
```js
var removeNthFromEnd = function(head, n) {
    let h = new ListNode();
    let slow = h;
    slow.next = head;
    let fast = head;
    for (let i = 0; i < n; ++i) {
        fast = fast.next;
    }
    while(slow && fast) {
        slow = slow.next;
        fast = fast.next;
    }
    slow.next = slow.next.next;
    return h.next;
};
```

## 归并排序链表
```js
const merge = (head1, head2) => {
    let h = new ListNode(0);
    let p = h;
    let p1 = head1, p2 = head2;
    while (p1 && p2) {
        if (p1.val <= p2.val) {
            p.next = p1;
            p1 = p1.next;
        } else {
            p.next = p2;
            p2 = p2.next;
        }
        p = p.next;
    }
    p.next = p1 ? p1 : p2;
    return h.next;
}

const mergeSort = (head, tail) => {
    if (!head) {
        return head;
    }
    if (head.next === tail) {
        head.next = null;
        return head;
    }
    let slow = head, fast = head;
    while (fast !== tail) {
        slow = slow.next;
        fast = fast.next;
        if (fast !== tail) {
            fast = fast.next;
        }
    }  
    const mid = slow;
    return merge(mergeSort(head, slow), mergeSort(mid, tail));
}
```

## 中序遍历
```js
var inorderTraversal = function(root) {
    const res = [];
    let stack = [];
    while (root || stack.length) {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        const top = stack.pop();
        res.push(top.val);
        root = top.right;
    }
    return res;
}
```

## 前序遍历
```js
var preorderTraversal = function(root) {
    const res = [];
    if (!root) {
        return res;
    }
    let stack = [];
    let node = root;
    while(node || stack.length) {
        while (node) {
            res.push(node.val);
            stack.push(node);
            node = node.left;
        }
        node = stack.pop();
        node = node.right;
    }
    return res;
};
```

## 后序遍历
```js
var postorderTraversal = function(root) {
    const ans = [];
    const stack = [];
    if (!root) {
        return ans;
    }
    let prev = null;
    while (root || stack.length) {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        if (!root.right || root.right === prev) {
            ans.push(root.val);
            prev = root;
            root = null;
        } else {
            stack.push(root);
            root = root.right;
        }
    }
    return ans;
};
```

## 二叉树层序遍历
```js
var levelOrder = function(root) {
    const ans = [];
    let queue = [];
    if (!root) {
        return ans;
    }
    queue = [root];
    while (queue.length) {
        let t = [];
        let q = [];
        for (let i = 0; i < queue.length; i++) {
            t.push(queue[i].val);
            if (queue[i].left) {
                q.push(queue[i].left);
            }
            if (queue[i].right) {
                q.push(queue[i].right);
            }
        }
        queue = q;
        ans.push(t);
    }
    return ans;
};
```

## 验证是二叉树搜索树
```js
var isValidBST = function(root) {
    const stack = [];
    let inorder = -Infinity;
    while (root || stack.length) {
        while(root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        if (root.val <= inorder) {
            return false;
        }
        inorder = root.val;
        root = root.right;
    }
    return true;
};
```

## 二叉搜索树第K小的
```js
var kthSmallest = function(root, k) {
    const stack = [];
    while (root || stack.length) {
        while(root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        --k;
        if (k === 0) {
            break;
        }
        root = root.right;
    }
    return root.val;
};
```

## 最近公共祖先
```js
var lowestCommonAncestor = function(root, p, q) {
    if (!root || root === p || root === q) {
        return root;
    }
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);
    if (left === null) {
        return right;
    }
    if (right === null) {
        return left;
    }
    return root;
};
```

## 全排列
```js
var permute = function(nums) {
    const res = [];
    const used = {};
    const dfs = (path) => {
        if (path.length === nums.length) {
            res.push(path.slice());
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[nums[i]]) {
                continue;
            }
            used[nums[i]] = true;
            path.push(nums[i]);
            dfs(path);
            path.pop();
            used[nums[i]] = false;
        }
    }
    dfs([]);
    return res;
};
```

## 子集
```js
var subsets = function(nums) {
    const res = [];
    const dfs = (index, list) => {
        if (index === nums.length) {
            res.push(list.slice());
            return;
        }
        list.push(nums[index]);
        dfs(index + 1, list);
        list.pop();
        dfs(index + 1, list);
    }
    dfs(0, []);
    return res;
};
```

## 排序数组中最左和最右的值
```js
var searchRange = function(nums, target) {
    const helperLeft = (nums, target) => {
        let len = nums.length;
        let low = 0, high = len - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const x = nums[mid];
            if (target <= x) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
    const helperRight = (nums, target) => {
        let len = nums.length;
        let low = 0, high = len - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const x = nums[mid];
            if (target >= x) {
               low = mid + 1
            } else {
                high = mid - 1;
            }
        }
        return high;
    }
    const left = helperLeft(nums, target);
    const right = helperRight(nums, target);
    if (left > right) {
        return [-1, -1];
    }
    return [left, right];
};
```