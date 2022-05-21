# Async Actions Inside Of Constructors

## Problem Statement

Constructors can not be asynchronous, so if any asynchronous actions need to take place before the object instance is usable you have to include an asynchronous init method to complete the setup.

```js
const house = new House();
await house.init();
```
---

## Solution
To reduce the number of statements the caller needs to remember and stick to common class syntax's we can use Functional Parameters.

---

### Full Example 
``` ts
type HouseOption = (h: House) => void;

class House {
  private rooms: number
  private externalData: any

  constructor(rooms: number, ...options: HouseOption[]) {
    this.rooms = 1;
    this.externalData = null;
    
    for (const option of options) {
      option(this);
    }
  }
  public static async WithExternalData(): Promise<HouseOption> {
    const data = await externalAPI.getData();
    return (h: House): void => {
      h.externalData = data
    }
  }
}

const myHouse = new House(
  5,
  await House.WithExternalData(),
)
```
---

### Detailed Reference

This provides typing for what our functional parameters return.
``` ts
type HouseOption = (h: House) => void;
```

We can call the constructor normally passing in a number as the first parameter, then we can await the static Functional Parameter.
``` ts
const myHouse = new House(
  5,
  await House.WithExternalData(),
);
```

This function executes before the constructor is called so you can await actions here.
``` ts
public static async WithExternalData(): Promise<HouseOption> {
    const data = await externalAPI.getData();
    ...
}
```

To finish this function we return synchronous function that takes an instance of this class and assign values from the async part to that instance. (will be the instance the we are instantiating).
``` ts
public static async WithExternalData(): Promise<HouseOption> {
    ...
    return (h: House): void => {
      h.externalData = data
    }
  }
```

This acts like a normal synchronous constructor
``` ts
  constructor(rooms: number, ...options: HouseOption[]) {
    this.rooms = 1;
    this.externalData = null;
    ...
  }
```

Still synchronously the constructor continues to call every function in the array. these functions are the synchronous functions that are returned from the Functional Parameters
``` ts
constructor(rooms: number, ...options: HouseOption[]) {
  ...
  options.forEach((option) => {
      option(this);
    });
}
```
