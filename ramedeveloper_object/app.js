// // 객체
// const a = 'age';

// const obj1 = {
//     id: 1,
//     name: '라매',
//     "my name": '개발자',
//     // 변수를 사용하고 싶을 때
//     [a] : 3,

//     // 객체 내 함수로 이는 메서드가 될 수 있다.
//     getLameNameWithFunction : function(){
//         console.log('개발자 입니다.');
//     },
//     // function을 생략해서 사용할 수 있는 장점이 있다.
//     getLameName(){
//         console.log(`function this : ${this}`);

//         // {
//         //     id: 1,
//         //     name: '라매',
//         //     'my name': '개발자',
//         //     age: 3,
//         //     getLameNameWithFunction: [Function: getLameNameWithFunction],
//         //     getLameName: [Function: getLameName],
//         //     getLameNameArrowFunction: [Function: getLameNameArrowFunction]
//         //   }
//         console.log('개발자라니까');
//     },

//     getLameNameArrowFunction: () => {
//         console.log(`arrow function this : ${this}`); // 객체 내에서 arrow function을 넣으면, 그냥 function을 넣는 경우와 다르게 this의 범위가 다르다. 전역 스코프의 값을 가져오는데, 없으므로 undefined를 의미
//         console.log(this.name);
//         // function this : [object Object]
//         // 개발자라니까
//         // arrow function this : [object Object]
//         // undefined
//     }
// }


// console.log(obj1);
// // obj1.getLameNameWithFunction();
// obj1.getLameName();
// obj1.getLameNameArrowFunction();

// console.log(obj1.id);
// console.log(obj1.name);
// console.log(obj1['my name']);
// console.log(obj1[a]);



// 구조 분해 할당
const obj2 ={
    id: 1,
    name: '라매',
    age: 3,
    habit: 'coding',
};

// const id = obj2.id;
// const name = obj2.id;
// const age = obj2.age;
// const habit = obj2.habit;

// 위와 같이 적는것은 비효율적이기 때문에, 구조분해할당이라는 문법을 활용한다.
const {id,name,age,habit} = obj2;
// -> 꺼내고 싶은 값만 꺼내고 싶은 경우, 원하는 key값만 넣어줘도 된다.
const {id, haibit} = obj2;

const arr1 = [1, '라매', 3];

// const lameId = arr1[0];
// const lameName = arr1[1];
// const lameAge = arr1[2];

const [lameId, lameName, lameAge] = arr1;
