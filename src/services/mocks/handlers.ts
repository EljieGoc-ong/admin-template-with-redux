import { http, HttpResponse } from 'msw'
import { mockUsers, mockDashboardData, mockAdmin } from './data'

const parseGraphQLRequest = async (req: Request) => {
  const body = await req.json()
  return { query: body.query as string, variables: body.variables as Record<string, unknown> }
}

const extractOperation = (query: string) => {
  const match = query.match(/(?:query|mutation)\s+(\w+)/)
  return match ? match[1] : null
}

// Match /graphql on any origin (dev: localhost:5173, tests: localhost)
export const handlers = [
  http.post(({ request }) => new URL(request.url).pathname === '/graphql', async ({ request }) => {
    const { query, variables } = await parseGraphQLRequest(request)
    const operation = extractOperation(query)

    if (operation === 'Login') {
      const { email, password } = variables as { email: string; password: string }
      if (email === 'admin@example.com' && password === 'password123') {
        return HttpResponse.json({
          data: {
            login: {
              user: { ...mockAdmin },
              token: 'mock-jwt-token-' + Date.now(),
            },
          },
        })
      }
      return HttpResponse.json(
        {
          errors: [{ message: 'Invalid credentials' }],
        },
        { status: 200 }
      )
    }

    if (operation === 'GetUsers') {
      return HttpResponse.json({
        data: { users: mockUsers },
      })
    }

    if (operation === 'GetDashboard') {
      return HttpResponse.json({
        data: { dashboard: mockDashboardData },
      })
    }

    if (operation === 'CreateUser') {
      const input = (variables as { input: { name: string; email: string; role: string } }).input
      const newUser = {
        id: `new-${Date.now()}`,
        name: input.name,
        email: input.email,
        role: input.role as 'admin' | 'manager' | 'user',
        avatar: undefined,
        createdAt: new Date().toISOString(),
      }
      mockUsers.push(newUser)
      return HttpResponse.json({
        data: { createUser: newUser },
      })
    }

    if (operation === 'UpdateUser') {
      const { id, input } = variables as { id: string; input: Record<string, unknown> }
      const user = mockUsers.find((u) => u.id === id)
      if (user) {
        Object.assign(user, input)
        return HttpResponse.json({
          data: { updateUser: user },
        })
      }
    }

    if (operation === 'DeleteUser') {
      const id = variables?.id as string
      const idx = mockUsers.findIndex((u) => u.id === id)
      if (idx >= 0) {
        mockUsers.splice(idx, 1)
        return HttpResponse.json({
          data: { deleteUser: true },
        })
      }
    }

    return HttpResponse.json({ errors: [{ message: 'Unknown operation' }] }, { status: 200 })
  }),
]
