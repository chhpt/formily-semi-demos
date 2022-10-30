import { useMemo } from 'react'
import { FormProvider } from '@formily/react'
import { createForm } from '@formily/core'
import { Button, SchemaField } from '@formily/semi'
import { observable } from '@formily/reactive'

const auto = observable({
  a: 1
})

const schema = {
  type: 'object',
  properties: {
    input: {
      type: 'string',
      title: '输入框',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        style: {
          width: 240
        }
      }
    },
    textarea: {
      type: 'string',
      title: '输入框',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        style: {
          width: 240
        }
      },
      'x-reactions': (field) => {
        field.value = String(auto.a)
      }
    }
  }
}

export default () => {
  const form = useMemo(() => {
    return createForm({
      initialValues: {}
    })
  }, [])

  return (
    <div>
      <Button
        onClick={() => {
          auto.a += 1
        }}
      >
        Value + 1
      </Button>
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    </div>
  )
}
