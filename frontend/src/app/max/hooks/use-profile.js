import {useSelector} from 'react-redux';

export function useProfile() {
    const user = useSelector((state) => state.user);
    return user
}
