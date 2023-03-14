import styles from "../category/Category.module.css";
import Image from "next/image";
import Header from "@/components/header/header";
import Head from "next/head";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";

type Category = {
  name: string;
  url: string;
  id: string;
  catID: any;
  data: any;
};

export default function CategoryPage({ data, catID }: Category) {
  const id = Object.keys(catID).map((key) => {
    return { [key]: catID[key as keyof typeof catID] };
  });
  const cat = Object.keys(data).map((key) => {
    return { [key]: data[key as keyof typeof data] };
  });

  return (
    <>
      <Head>
        <title>Cat App</title>
        <meta
          name="description"
          content="Cat app that fetch cat breeds from the cat API"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <div className={styles.filterButtonContainer}>
          <Link href={"/"}>Clear filter</Link>
          <Menu as="div">
            <Menu.Button className={styles.filterButton}>
              Filter
              <BsChevronDown />
            </Menu.Button>
            <Menu.Items className={styles.filterItems}>
              {id.map((c: any, index: number) => {
                return (
                  <Menu.Item key={c[index].id}>
                    <Link href={`/category/${c[index].id}`} key={c[index].id}>
                      {c[index].name}
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Menu>
        </div>
        <div className={styles.activeFilter}>
          <h3>Active filter: {cat[0][0].categories[0].name}</h3>
        </div>
        <section className={styles.section}>
          {cat.map((c: any, index: number) => {
            return (
              <div className={styles.categoryContainer} key={c[index].id}>
                <Image
                  className={styles.category}
                  key={c[index].id}
                  width="500"
                  height="500"
                  alt={c[index].id}
                  src={c[index].url}
                ></Image>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context: {
  query: { category: any };
}) {
  const catId = context.query.category;

  let url = `https://api.thecatapi.com/v1/images/search?category_ids=${catId}&limit=12&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  let urlCategoriesId = `https://api.thecatapi.com/v1/categories?limit=12&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  const response = await fetch(url);
  const categoriesId = await fetch(urlCategoriesId);

  const categoryId = await categoriesId.json();
  const data = await response.json();

  return {
    props: {
      data: data,
      catID: categoryId,
    },
  };
}
