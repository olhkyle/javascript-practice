const obj1 = {
    id: 1,
    name: '라매',
    age: 3,
    habit: 'coding',
    deepObj : {
        deep: 'abc',
    },
};

// obj1.email = 'kylekwon96@gmail.com';

// const obj2 = obj1; 

// deep copy를 하고 싶을 때, 재귀 함수 활용

const obj2 = {...obj1, email: 'kylekwon96@gmail.com'};
// 펼침 연산자에서 ...는 ob1에서 중괄호를 벗겨낸다고 생각하고, 이를 obj2 객체 안에 넣으면, 깊은 복사가 된다.
// 펼침 연산자는 배열에서도 사용 가능하다.

console.log('변경 전');
console.log('obj1 : ', obj1); // 
console.log('obj2 : ', obj2);

obj2.email = 'empty';
console.log('변경 후');
console.log('obj1 : ', obj1);
console.log('obj2 : ', obj2);

console.log(obj1 === obj2);

// 모두 같은 값 -> shallow copy



