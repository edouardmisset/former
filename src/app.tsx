import { Button, Form, Input, Slider } from 'antd'
import './app.css'
import {
  GRADE_TO_NUMBER,
  NUMBER_TO_GRADE,
  convertAscentGradeToNumber,
  convertNumberToAscentGrade,
} from './utils/converter'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

const numberGrades = Object.values(GRADE_TO_NUMBER)

type AscentDescription = {
  grade: number
  name: string
}

export function App() {
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<AscentDescription>({
    defaultValues: {
      name: '',
      grade: convertAscentGradeToNumber('7a'),
    },
  })
  const onSubmit: SubmitHandler<AscentDescription> = data => console.log(data)

  return (
    <form
      name="ascent"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Name"
            rules={[
              { required: true, message: 'Please input your ascent name!' },
            ]}
          >
            <Input {...field} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="grade"
        render={({ field }) => (
          <Form.Item label="Grade">
            <Slider
              {...field}
              min={Math.min(...numberGrades)}
              max={Math.max(...numberGrades)}
              tooltip={{
                formatter: (value: number) => convertNumberToAscentGrade(value),
              }}
              marks={Object.fromEntries(
                Object.entries(NUMBER_TO_GRADE).map(([number, grade]) => [
                  number,
                  grade?.endsWith('a') ? grade : undefined,
                ]),
              )}
            />
          </Form.Item>
        )}
      />
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </form>
  )
}
