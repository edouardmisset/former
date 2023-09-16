import { Button, ConfigProvider, Form, Input, Slider } from 'antd'
import './app.css'
import {
  ROUTE_GRADE_TO_NUMBER,
  NUMBER_TO_ROUTE_GRADE,
  convertGradeToNumber,
  convertNumberToGrade,
  RouteGrade,
} from './utils/converter'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

const numberGrades = [...ROUTE_GRADE_TO_NUMBER.values()]

type AscentDescription = {
  grade: number
  name: string
}

export function App() {
  const climberAverageGrade: RouteGrade = '7b'
  const climberHighestGrade: RouteGrade = '8b+'
  const climberHighestGradeNumber = convertGradeToNumber(climberHighestGrade)
  const numberOfGradeFromWarmUpToMax = 8

  const { control, handleSubmit } = useForm<AscentDescription>({
    defaultValues: {
      name: '',
      grade: convertGradeToNumber(climberAverageGrade),
    },
  })
  const onSubmit: SubmitHandler<AscentDescription> = data => console.log(data)

  return (
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            dotSize: 8,
            dotActiveBorderColor: 'grey',
            dotBorderColor: 'darkgrey',
            handleActiveColor: 'darkred',
            handleSize: 20,
            handleColor: 'black',
            railSize: 15,
          },
        },
      }}
    >
      <form
        name="ascent"
        style={{ maxWidth: 600 }}
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Congrats 🎉</h1>

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
          render={({ field }) => {
            const firstStop =
              ((climberHighestGradeNumber - numberOfGradeFromWarmUpToMax) *
                100) /
              ROUTE_GRADE_TO_NUMBER.size
            const secondStop =
              (climberHighestGradeNumber * 100) / ROUTE_GRADE_TO_NUMBER.size

            const halfFuzzyZone = 5
            return (
              <Form.Item label="Grade">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '1.5em',
                  }}
                >
                  <i style={{ fontSize: 'xx-large' }}>🦵</i>
                  <Slider
                    style={{ flex: 1 }}
                    {...field}
                    min={Math.min(...numberGrades)}
                    max={Math.max(...numberGrades)}
                    keyboard={true}
                    tooltip={{
                      formatter: (value: number) => convertNumberToGrade(value),
                    }}
                    marks={Object.fromEntries(
                      [...NUMBER_TO_ROUTE_GRADE].map(([number, grade]) => [
                        number,
                        grade?.endsWith('a') ? grade : undefined,
                      ]),
                    )}
                    trackStyle={{
                      backgroundColor: 'transparent',
                    }}
                    railStyle={{
                      background: `linear-gradient(to right in oklab, 
                        oklch(100% .01 95) 0%, 
                        oklch(80% .05 95) ${firstStop - halfFuzzyZone}%,
                        oklch(80% .4 95) ${firstStop + halfFuzzyZone}%,
                        oklch(55% .45 350) ${secondStop - halfFuzzyZone}%,
                        oklch(55% 0.05 350) ${secondStop + halfFuzzyZone}%,
                        oklch(30% 0.01 350) 100%
                        )`,
                    }}
                  />
                  <i style={{ fontSize: 'xx-large' }}>💪</i>
                </div>
              </Form.Item>
            )
          }}
        />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </form>
    </ConfigProvider>
  )
}
