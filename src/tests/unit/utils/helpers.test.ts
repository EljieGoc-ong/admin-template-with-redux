import { describe, it, expect } from 'vitest'
import { validateEmail, formatCurrency, calculatePercentage } from '@/utils/helpers'

describe('helpers', () => {
  describe('validateEmail', () => {
    it('should validate correct email format', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name+tag@example.co.uk')).toBe(true)
    })

    it('should reject invalid email format', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
    })
  })

  describe('formatCurrency', () => {
    it('should format numbers as currency', () => {
      expect(formatCurrency(1000)).toBe('$1,000')
      expect(formatCurrency(10600)).toBe('$10,600')
    })
  })

  describe('calculatePercentage', () => {
    it('should calculate percentage correctly', () => {
      expect(calculatePercentage(67, 100)).toBe(67)
      expect(calculatePercentage(50, 200)).toBe(25)
    })
  })
})
