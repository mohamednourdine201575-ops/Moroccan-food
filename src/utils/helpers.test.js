import { describe, expect, it } from 'vitest'
import { menuItems } from '../data/menu'
import {
  STORAGE_KEYS, cartCount, cartSubtotal, filterMenu, formatPrice,
  isValidEmail, isValidPassword, readStorage, validateContact, writeStorage
} from './helpers'

const validEmails = Array.from({ length: 30 }, (_, i) => `student${i}@university${i % 5}.edu`)
const invalidEmails = Array.from({ length: 30 }, (_, i) => [
  `student${i}`, `student${i}@`, `@example${i}.com`, `student ${i}@example.com`, `student${i}@example`
][i % 5])
const validPasswords = Array.from({ length: 20 }, (_, i) => `Morocco${i}A`)
const invalidPasswords = Array.from({ length: 20 }, (_, i) => [
  `short${i}`, `lowercase${i}`, `UPPERCASE${i}`, `NoNumberAA`, `${i}1234567`
][i % 5])

describe('email validation', () => {
  it.each(validEmails)('accepts %s', (email) => expect(isValidEmail(email)).toBe(true))
  it.each(invalidEmails)('rejects %s', (email) => expect(isValidEmail(email)).toBe(false))
})

describe('password validation', () => {
  it.each(validPasswords)('accepts a strong password sample', (password) => expect(isValidPassword(password)).toBe(true))
  it.each(invalidPasswords)('rejects a weak password sample', (password) => expect(isValidPassword(password)).toBe(false))
})

describe('currency formatting', () => {
  it.each(Array.from({ length: 25 }, (_, i) => i * 2.25))('formats %s as USD', (value) => {
    expect(formatPrice(value)).toMatch(/^\$/)
    expect(formatPrice(value)).toContain(value.toFixed(2))
  })
})

describe('cart calculations', () => {
  it.each(Array.from({ length: 30 }, (_, i) => i + 1))('counts a quantity of %s', (quantity) => {
    expect(cartCount([{ quantity }])).toBe(quantity)
  })
  it.each(Array.from({ length: 30 }, (_, i) => i + 1))('calculates subtotal case %s', (quantity) => {
    expect(cartSubtotal([{ price: 2.5, quantity }])).toBe(2.5 * quantity)
  })
})

describe('menu filtering', () => {
  it.each(menuItems)('finds $name by name', (dish) => {
    expect(filterMenu(menuItems, dish.name)).toEqual([dish])
  })
  it.each(menuItems)('finds $name by category', (dish) => {
    expect(filterMenu(menuItems, '', dish.category)).toContainEqual(dish)
  })
  it.each(Array.from({ length: 20 }, (_, i) => `not-a-dish-${i}`))('returns no results for %s', (term) => {
    expect(filterMenu(menuItems, term)).toEqual([])
  })
})

describe('contact validation', () => {
  it.each(Array.from({ length: 20 }, (_, i) => i))('accepts valid contact case %s', (i) => {
    expect(validateContact({ name: `Guest ${i}`, email: `guest${i}@mail.com`, message: `A reservation message number ${i}.` })).toEqual({})
  })
  it.each(Array.from({ length: 20 }, (_, i) => i))('rejects short name case %s', (i) => {
    expect(validateContact({ name: 'A', email: `guest${i}@mail.com`, message: 'A sufficiently long message.' })).toHaveProperty('name')
  })
  it.each(Array.from({ length: 20 }, (_, i) => i))('rejects bad email case %s', (i) => {
    expect(validateContact({ name: 'Guest', email: `bad-email-${i}`, message: 'A sufficiently long message.' })).toHaveProperty('email')
  })
  it.each(Array.from({ length: 20 }, (_, i) => i))('rejects short message case %s', (i) => {
    expect(validateContact({ name: `Guest ${i}`, email: `guest${i}@mail.com`, message: 'Short' })).toHaveProperty('message')
  })
})

describe('localStorage helpers', () => {
  it.each(Object.values(STORAGE_KEYS))('writes and reads %s', (key) => {
    expect(writeStorage(key, { saved: true })).toBe(true)
    expect(readStorage(key, null)).toEqual({ saved: true })
  })
  it.each(Object.values(STORAGE_KEYS))('uses fallback for malformed %s', (key) => {
    localStorage.setItem(key, '{broken')
    expect(readStorage(key, [])).toEqual([])
  })
})
