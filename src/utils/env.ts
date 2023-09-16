export function getEnv(variable: string) {
  const value = import.meta.env[variable]
  if (typeof value === 'undefined') {
    console.warn(`Seems like the variable "${variable}" is not set in the environment. 
    Did you forget to execute "cp .env.sample .env" and adjust variables in the .env file to match your own environment ?`)
  }
  return value
}
