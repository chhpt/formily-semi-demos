import { connect, mapProps } from '@formily/react'
import { Input } from '@douyinfe/semi-ui'

const ArrayInputInternal: React.FC<{
  value: [string, string]
  onChange: (value: [string, string]) => void
}> = ({ value = [], onChange }) => {
  return (
    <div className="flex flex-col space-y-3">
      <Input value={value[0]} onChange={(v) => onChange([v, value?.[1]])} />
      <Input value={value[1]} onChange={(v) => onChange([value?.[0], v])} />
    </div>
  )
}

export const ArrayInput = connect(ArrayInputInternal, mapProps({})) as any
