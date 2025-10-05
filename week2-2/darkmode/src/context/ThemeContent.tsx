import clsx from 'clsx';
import { THEME, useTheme } from './ThemeProvider';

export default function ThemeContent() {
    const { theme } = useTheme();
    
    const isLightMode = theme === THEME.LIGHT;
    

    return <div className={clsx(
        'p-4 h-dvh w-full', 
        isLightMode ? 'bg-white' : 'bg-gray-800'
    )}
    ><h1 className={clsx('text-wxl font-bold', 
        isLightMode ? 'text-black' : 'text-white'
    )}>
        Theme Content
    </h1>    <p className={clsx('mt-2', 
        isLightMode ? 'text-black' : 'text-white'
    )}> 
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam odio pariatur iusto voluptatem vel nemo facilis sed eum consectetur, quos similique repellat velit? Ab assumenda asperiores cum natus! Vel, iusto!
    </p>
    </div>
}