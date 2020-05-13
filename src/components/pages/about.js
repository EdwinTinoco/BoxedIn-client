import React from 'react';
import AboutPicture1 from "../../images/backgrounds/bg-boxes1.jpg"
import AboutPicture2 from "../../images/backgrounds/bg-boxes3.jpg"

export default function () {
    return (
        <div className="squares-wrapper">
            <div className="squares">
                <div className="square">
                    <div className="img-wrapper">
                        <img src={AboutPicture1} />
                    </div>

                    <div className="square-text-wrapper">
                        <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>

                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem natus molestiae sunt perspiciatis quis aut facilis, laboriosam suscipit voluptas labore repellendus ut inventore et excepturi corporis quisquam animi mollitia corrupti illo commodi dolore dicta. Sapiente possimus, dolor, dolorum iure rem maiores iste nulla quo quia numquam, sed voluptate nam? Odio?</p>
                    </div>
                </div>
                <div className="square">
                    <div className="square-text-wrapper">
                        <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>

                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem natus molestiae sunt perspiciatis quis aut facilis, laboriosam suscipit voluptas labore repellendus ut inventore et excepturi corporis quisquam animi mollitia corrupti illo commodi dolore dicta. Sapiente possimus, dolor, dolorum iure rem maiores iste nulla quo quia numquam, sed voluptate nam? Odio?</p>
                    </div>

                    <div className="img-wrapper">
                        <img src={AboutPicture2} alt="Fries" />
                    </div>
                </div>
            </div>
        </div>


        // <div className="about-main-wrapper">
        //     <div
        //         className="left-column"
        //         style={{
        //             background: "url(" + AboutPicture + ") no-repeat",
        //             backgroundSize: "cover",
        //             backgroundPosition: "center"
        //         }}

        //     />
        //     <div className="right-column">
        //         <div className="title">
        //             <h1>About Us</h1>
        //         </div>
        //         Maecenas faucibus mollis interdum. Integer posuere erat a ante venenatis
        //         dapibus posuere velit aliquet. Sed posuere consectetur est at lobortis.
        //         Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
        //         Aenean lacinia bibendum nulla sed consectetur. Maecenas sed diam eget
        //         risus varius blandit sit amet non magna. Morbi leo risus, porta ac
        //         consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida
        //         at eget metus. Donec sed odio dui. Cras mattis consectetur purus sit
        //         amet fermentum. Etiam porta sem malesuada magna mollis euismod. Nulla
        //         vitae elit libero, a pharetra augue. Aenean eu leo quam. Pellentesque
        //         ornare sem lacinia quam venenatis vestibulum. Duis mollis, est non
        //         commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
        //         elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur
        //         et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
        //         commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis
        //         risus eget urna mollis ornare vel eu leo. Morbi leo risus, porta ac
        //         consectetur ac, vestibulum at eros. Vestibulum id ligula porta felis
        //         euismod semper.
        //     </div>
        // </div>
    )
}