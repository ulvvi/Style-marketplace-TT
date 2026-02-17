import { ContentBox } from "./ContentBox";
import { Order } from "./Order";
import { PersonCardName } from "./PersonCardName";
import { ProfileContainer } from "./ProfileContainer";
import { TabList } from "./TabList";

export function PrincipalContainer(){

    const variantesTeste: Variant[] = [
  // --- ITEM 1 (Repetido 1/3) ---
  {
    id: 101,
    color: "Vermelho",
    size: "42",
    produtos: {
      name: "Tênis Nike Air",
      price: 599.90,
      rating: 5,
      numReviews: 120,
      isOutOfStock: false
    },
  },
  
  // --- ITEM 2 (Único) ---
  {
    id: 202,
    color: "Preto",
    size: "M",
    produtos: {
      name: "Camiseta Básica",
      price: 49.90,
      rating: 4,
      numReviews: 30,
      isOutOfStock: false
    },
  },

  // --- ITEM 1 (Repetido 2/3) ---
  {
    id: 101, // Mesmo ID do primeiro
    color: "Vermelho",
    size: "42",
    produtos: {
      name: "Tênis Nike Air",
      price: 599.90,
      rating: 5,
      numReviews: 120,
      isOutOfStock: false
    },
  },

  // --- ITEM 3 (Repetido 1/2) ---
  {
    id: 305,
    color: "Azul",
    size: "Único",
    produtos: {
      name: "Boné Aba Reta",
      price: 89.90,
      rating: 4.5,
      numReviews: 10,
      isOutOfStock: false
    },
  },

  // --- ITEM 1 (Repetido 3/3) ---
  {
    id: 101, // Terceira vez aparecendo
    color: "Vermelho",
    size: "42",
    produtos: {
      name: "Tênis Nike Air",
      price: 599.90,
      rating: 5,
      numReviews: 120,
      isOutOfStock: false
    },
  },

  // --- ITEM 3 (Repetido 2/2) ---
  {
    id: 305, // Segunda vez aparecendo
    color: "Azul",
    size: "Único",
    produtos: {
      name: "Boné Aba Reta",
      price: 89.90,
      rating: 4.5,
      numReviews: 10,
      isOutOfStock: false
    },
  }
];

    return(
        <>
            <div className="flex max-w-[1400px] flex-col items-center justify-start gap-[32px] mt-[32px] mb-[32px] ">
            <PersonCardName name={"Jhon Doe"} email={"john.doe@example.com"} orders={2} memberSince={2023}/>
            </div>
            <div className="flex flex-col items-center gap-[8px] w-full">
                <ProfileContainer/>
                <div className="flex flex-col items-center gap-[24px] w-full">
                    <ContentBox title="Order History" titleClassName="!font-bold" 
                    className="!border-none shadow-none !pt-[4px] !pr-0 !pb-0 !pl-0"
                    buttonName="Export Orders" buttonLink="/Orders" buttonColor="white" buttonIconSrc="src/assets/icons/downloadIcon.svg"
                    buttonIconPos="left" buttonClassName="!w-[155px]">
                    
                    </ContentBox>
                    <Order 
                        variantes={variantesTeste} 
                        orderName="PEDIDO-TESTE-99"
                        totalPrice={2500.00}
                    />
                </div>
                
            </div>
            
            
        </>
    )

}