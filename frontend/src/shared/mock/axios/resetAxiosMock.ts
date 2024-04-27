import {httpMock} from './httpMock';

/**
 * Сбрасывает параметры мока с axios
 */
export function resetAxiosMock() {
    httpMock.reset();
}
