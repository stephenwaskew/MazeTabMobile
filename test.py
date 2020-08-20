def shuffle_string(s, indices):
    print(s, indices)
    res = [None] * len(s)
    for i in range(len(s)):
        res[indices[i]] = s[i]
    return res

#s = "codeleet" 
#indices = [4,5,6,7,0,2,1,3]
s = "aiohn" 
indices = [3,1,4,2,0]
#print(shuffle_string(s, indices))

#def countSmaller(self, nums: List[int]) -> List[int]:
#    res = [0] * len(nums)
#    for i, val in enumerate(nums):
#        for item in nums[i:]:
#            if item < val:
#                res[i] += 1
#    return res

def sum_digits(n):
    sum = 0
    while n:
        sum += n % 10       
        n //= 10
    return sum
import collections
def countLargestGroup(n):
    res = collections.defaultdict()
    for i in range(1, n+1):
        digits = sum_digits(i)
        if digits not in res:
            res[digits] = 1
        else:
            res[digits] += 1
    largest_group, count = 0, 0
    for key, value in res.items():
        if value == largest_group:
            count += 1
        if value > largest_group:
            largest_group, count = value, 1

    print(res, count)


#countLargestGroup(2)

def numSmallerByFrequency(queries, words):    
    sorted_queries, sorted_words, res = [], [], []
    for query in queries:
        counter = collections.Counter(query)
        sorted_queries.append(sorted(counter.items()))
    for word in words:
        counter = collections.Counter(word)
        sorted_words.append(sorted(counter.items()))
    for query in sorted_queries:
        count = 0
        for word in sorted_words:
            print(query[0][1], word[0])
            if query[0][1] < word[0][1]:
                count += 1
        res.append(count)
    return res
    

queries = ["bba","abaaaaaa","aaaaaa","bbabbabaab","aba","aa","baab","bbbbbb","aab","bbabbaabb"]
words = ["aaabbb","aab","babbab","babbbb","b","bbbbbbbbab","a","bbbbbbbbbb","baaabbaab","aa"]

#print(numSmallerByFrequency(queries, words))
# [6,1,1,2,3,3,3,1,3,2]

def n_queens(queens, king):
    def solve_n_queens(row):
        if row == len(queens):
            # All queens are legally placed.
            result.append(col_placement.copy())
            return
        for col in range(len(queens)):
            # Test if a newly placed queen will conflict any earlier queens
            # placed before.
            if all(
                    abs(c - col) not in (0, row - i)
                    for i, c in enumerate(col_placement[:row])):
                col_placement[row] = col
                solve_n_queens(row + 1)

    result = []
    col_placement = [0] * len(queens)
    solve_n_queens(0)
    return result

queens = [[0,1],[1,0],[4,0],[0,4],[3,3],[2,4]]
king = [0,0]
#print(n_queens(queens, king))

def intersect_arrays(g1, g2):
    res = collections.Counter(g1) & collections.Counter(g2)
    result = []
    print(list(res.keys()))
    for key, value in res.items():
        for i in range(value):
            result.append(key)
    print(result)
    return result


#nums1 = [1,2,2,1]
#nums2 = [2,2]
nums1 = [4,9,5]
nums2 = [9,4,9,8,4]
#intersect_arrays(nums1, nums2)

def matrix_calc(mat, k):
    res = []
    for i, row in enumerate(mat):
        res.append((i, row.count(1)))
    print(res)
    sorted_res = sorted(res, key=lambda tup:tup[1])
    print(sorted_res)
    result = []
    for i in range(k):
        result.append(sorted_res[i][0])
    print(result)
    return result


mat = [[1,1,0,0,0],
 [1,1,1,1,0],
 [1,0,0,0,0],
 [1,1,0,0,0],
 [1,1,1,1,1]]
k = 3
#matrix_calc(mat, k)



def make_sum(g1, target):
    for i, val in enumerate(g1):
        print(i, val)
        first_index = i
        for j in range(i+1, len(g1)):
            if (val + g1[j]) == target:
                return [i, j]



g1 = [2, 7, 11, 15]
target = 9
#g1 = [3,2,4]
#target = 6

#print(make_sum(g1, target))

# Because nums[0] + nums[1] = 2 + 7 = 9,
# return [0, 1]

def find_dups(s, k):
    stack = []
    dups = []
    count = 0
    for i in range(len(s)):
        print(i, s[i], stack, dups)
        if len(stack) != 0:
            cur_val = stack.pop()
            if cur_val in dups:
                dups.append(cur_val)
                if len(dups) == k:
                    dups = []
            elif cur_val not in dups:
                for val in dups:
                    stack.append(val)
            elif cur_val == s[i]:
                print('inside: ', dups)
                dups.append(cur_val)
                dups.append(s[i])
                if len(dups) == k:
                    dups = []
            else:
                stack.append(cur_val)
                stack.append(s[i])
        else:
            stack.append(s[i])
    print(stack, dups)
    if len(dups) != 0:
        for val in dups:
            stack.append(val)

    return "".join(stack)    

print(find_dups("deeedbbcccbdaa", 3))