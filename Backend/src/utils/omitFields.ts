/**
 * Omit specified keys from an object.
 * @template T - The type of the object.
 * @template K - The type of the keys to omit.
 * @param {T} obj - The object from which to omit keys.
 * @param {K[]} keys - The keys to omit.
 * @returns {Omit<T, K>} - The resulting object without the omitted keys.
 */
export default function omitFields<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key as K))) as Omit<T, K>;
}
