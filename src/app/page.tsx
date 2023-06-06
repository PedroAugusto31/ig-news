import { GetServerSideProps } from "next";
import Image from "next/image";
import styles from "./home.module.scss";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

interface HomeProps {
	product: {
		priceId: string;
		amount: number;
	};
}

export default function Home({ product }: HomeProps) {
	return (
		<main className={styles.contentContainer}>
			<section className={styles.hero}>
				<span>Hey, welcome</span>
				<h1>
					News about the <span>React</span> world.
				</h1>
				<p>
					Get access to all the publications <br />
					<span>for {product.amount} month</span>
				</p>
				<SubscribeButton priceId={product.priceId} />
			</section>
			<Image
				src="/images/avatar.svg"
				alt="Girl coding"
				width={336}
				height={521}
			/>
		</main>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const price = await stripe.prices.retrieve("price_1NEe6tC04YOmAL43T0C7cdv3");

	const product = {
		priceId: price.id,
		amount: new Intl.NumberFormat("en-us", {
			style: "currency",
			currency: "USD",
		}).format(price.unit_amount! / 100),
	};

	return {
		props: {
			product,
		},
	};
};
