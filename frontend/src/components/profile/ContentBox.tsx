import type { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../Button';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  buttonName?: string;
  buttonIconSrc?: string;
  buttonLink?: string;
  buttonIconAlt?: string;
  buttonIconPos?: "left" | "right"
}

export function ContentBox({ children,buttonName,buttonIconSrc,buttonIconAlt,buttonIconPos,buttonLink, className, ...props }: CardProps) {

    const showButton = buttonName || buttonIconSrc || buttonLink || buttonIconAlt || buttonIconPos;

  return (
    <div
      className={`flex flex-col items-center pt-[25px] pr-[1px] pb-[1px] pl-[1px] gap-[24px] w-full border-solid border-1 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] ${className || ''}`}
      {...props}
    >
        <div className="flex justify-between w-full ">
            <h1>
                Title
            </h1>    
            {showButton && (
          <Button 
            texto={buttonName || ''} // Passa o nome dinâmico (ou string vazia se for só ícone)
            link={buttonLink || ''}
            iconSrc={buttonIconSrc || ''}
            iconAlt={buttonIconAlt || ''}
            iconPos={buttonIconPos}
          />
        )}
        </div>
        
      {children}
    </div>
  );
}


