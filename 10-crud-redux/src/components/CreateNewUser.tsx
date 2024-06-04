import { Button, Card, TextInput, Title } from '@tremor/react'
import React from 'react'
import { useUserActions } from '../hooks/useUserActions'

export function CreateNewUser() {
  const { addUser } = useUserActions()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    addUser({ name, email, github })
    form.reset()
  }

  return (
    <Card style={{ marginTop: '16px' }}>
      <Title>Create New User</Title>

      <form onSubmit={handleSubmit} className="">
        <TextInput name="name" placeholder="Joan" />
        <TextInput name="email" placeholder="joan@gmail.com" />
        <TextInput name="github" placeholder="joan98" />

        <div>
          <Button type="submit" style={{ marginTop: '16px' }}>
            Crear usuario
          </Button>
        </div>
      </form>
    </Card>
  )
}
