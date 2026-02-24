### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
i - getElementById("id") শুধু id দিয়ে element খুঁজে বের করে and একটাই element রিটার্ন কর.
ii - getElementsByClassName("class") শুধু class দিয়ে element খুঁজে একাধিক element রিটার্ন করে.
iii - querySelector("selector") CSS selector ব্যবহার করে and প্রথম matching element রিটার্ন করে.
iv - querySelectorAll("selector") CSS selector ব্যবহার করে & সব matching element রিটার্ন করে.

### 2. How do you create and insert a new element into the DOM?
createElement() দিয়ে  or 
innerText বা innerHTML দিয়ে or
appendChild() বা append() দিয়ে

### 3. What is Event Bubbling? And how does it work?
যখন কোনো child element এ event হয়, তখন সেই event উপরে parent element পর্যন্ত ছড়িয়ে যায়।

### 4. What is Event Delegation in JavaScript? Why is it useful?
Event Delegation হলো এমন পদ্ধতি যেখানে আমরা child element গুলোর জন্য আলাদা আলাদা event listener না দিয়ে তাদের parent element এ একটিমাত্র event listener যোগ করি, এবং event bubbling ব্যবহার করে কোন child element এ event হয়েছে তা নির্ণয় করি।

কেন এটি useful?
i- কম কোড লাগে
ii- Performance ভালো হয়ে

### 5. What is the difference between preventDefault() and stopPropagation() methods?
দুইটি method-ই event handling এ ব্যবহৃত হয়, কিন্তু কাজ আলাদা।

preventDefault()
Browser এর default behaviour বন্ধ করে।
example:
Form submit করলে page reload হওয়া বন্ধ করা
Link এ click করলে অন্য page এ না যায়


stopPropagation()
Event bubbling বন্ধ করে।
মানে event parent element এ যাবে না।
