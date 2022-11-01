import { useMemo } from 'react'
import { FormProvider } from '@formily/react'
import { createForm, onFormValuesChange } from '@formily/core'
import { Button, SchemaField } from '@formily/semi'
import { observable } from '@formily/reactive'
import { ArrayInput } from './title'

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
    },
    array: {
      type: 'string',
      title: '数组输入框',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayInput'
    }
  }
}

export default () => {
  const form = useMemo(() => {
    return createForm({
      initialValues: {},
      effects() {
        onFormValuesChange((form) => {
          console.log(form.values)
        })
      }
    })
  }, [])

  return (
    <div>
      <div className="mb-3">
        <Button
          onClick={() => {
            auto.a += 1
          }}
        >
          Value + 1
        </Button>
      </div>
      <FormProvider form={form}>
        <SchemaField schema={schema} components={{ ArrayInput }} />
      </FormProvider>
    </div>
  )
}
