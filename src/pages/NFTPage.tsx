import {
    createThirdwebClient,
    getContract,
    resolveMethod,
  } from "thirdweb";
  import { defineChain } from "thirdweb/chains";
  import { ThirdwebProvider } from "thirdweb/react";
  
const NFTPage = () => {
    const client = createThirdwebClient({
        clientId: "f518bd738fb261c709667a04f696d0da",
      });
      
      // connect to your contract
    const contract = getContract({
        client,
        chain: defineChain(656476),
        address: "0xC2F4BF524fDe0c295D4dc9429744cc03aa132758",
      });
 
    return (
      <ThirdwebProvider>
      </ThirdwebProvider>
  )
}

export default NFTPage






