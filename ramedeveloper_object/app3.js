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
console.log('obj1 : ', obj1.deepObj.deep); 
console.log('obj2 : ', obj2.deepObj.deep);

obj2.deepObj.deep = 'deep';
console.log('변경 후');
console.log('obj1 : ', obj1.deepObj.deep);
console.log('obj2 : ', obj2.deepObj.deep);

console.log(obj1.deepObj === obj2.deepObj);

// 객체 내에 객체가 있다면, 그 객체는 주소값을 가리키는데, 펼침 연산자로 깊은 복사를 시도했다고 하더라도, 내부 객체 자체는 주소값을 복사하기 때문에, 얕은 복사가 되었다고 볼 수밖에 없다.

// 해결하는 방법 -> JSON.stringify를 활용 후 -> JSON.parse(stringObj1);




