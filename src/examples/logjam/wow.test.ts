import { test, expect, vi } from 'vitest';

test('it spies on the multiply method', () => {
    const mock = vi.fn((x?: string) => {
        if (x) {
            return x.repeat(3);
        }
    });

    mock();
    mock();
    const result = mock('wow');

    expect(mock).toHaveBeenCalled();
    expect(result).toMatchInlineSnapshot('"wowwowwow"');
});
