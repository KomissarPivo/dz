import { Outlet, Link, useLoaderData } from 'react-router-dom';
import s from './Root.module.css'
import { getProducts } from '../../utils/forStorage';
import { Form } from 'react-router-dom';

export async function loader() {
    const products = await getProducts();
    return { products };
}

export const Root = () => {
    function Root() {

        const { products } = useLoaderData();
        return (
            <div id="main">
                <div id="menu">
                    <Form method="post">
                        <button type="submit">add product</button>
                    </Form>
                    {products.length ? (
                        <nav>
                            {products.map((product) => (
                                <Link key={product.id} to={`products/${product.id}`}>
                                    {product.name ? product.name : <i>Unnamed</i>}
                                </Link>
                            ))}
                        </nav>
                    ) : (
                        <p>
                            <i>no products here ...</i>
                        </p>
                    )}
                </div>

                <div id="product">
                    <Outlet />
                </div>
            </div>
        );
    }
    return (
        <>
            <nav>
                <Link to={'/products/1'}>Products1</Link>
                <Link to={'/products/2'}>Products2</Link>
            </nav>
            <Outlet />
        </>
    )
};

