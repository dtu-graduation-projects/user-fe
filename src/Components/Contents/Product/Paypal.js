import { PayPalButtons } from "@paypal/react-paypal-js"

function Paypal() {
    return (
        <PayPalButtons style={{
            color: "silver",
            layout: "horizontal",
            height: 48,
            tagline: false,
            shape: "pill",
        }} />
    )
}
export default Paypal
