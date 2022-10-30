import { Button } from '@douyinfe/semi-ui'
import { observer } from '@formily/react'
import { observable } from '@formily/reactive'

class Sub {
  arr = []

  change() {
    this.arr.push(1)
  }
}

class SubTest {
  load = false
  arr = []
  sub: Sub

  constructor() {
    this.sub = new Sub()
  }

  change() {
    this.load = !this.load
  }
}

class TestModel {
  arr: any[]
  sub: SubTest

  constructor() {
    this.arr = []
    this.sub = new SubTest()

    setTimeout(() => {
      this.sub.change()
    }, 100)
  }

  get first() {
    return this.arr[0]
  }

  add() {
    this.arr.push(1)
  }
}

const test = observable(new TestModel())

export default observer(() => {
  return (
    <div>
      <p>
        <Button onClick={() => test.add()}>长度 + 1</Button>
      </p>
      <p>数组长度：{test.arr.length}</p>
    </div>
  )
})
