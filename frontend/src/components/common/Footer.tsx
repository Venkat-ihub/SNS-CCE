const Footer = () => {

    return (
        <footer className="w-full flex justify-center items-center min-h-[30vh] border border-gray-300">
            <div className="container p-10">
                <div className="flex">
                    <div className="w-2/5">
                        <h3 className="text-3xl mb-5">Centre for Competitive Exams</h3>
                        <div className="w-3/4">
                            <p className="text-sm">CCE focuses on constantly endeavor to identify the potential opportunities for our students to elevate their personality and professional competence, which in turn will enhance their socio-economic status</p>
                            <hr className="border-1 border-black my-5" />
                            <p className="text-sm mb-5">SNS Kalvi Nagar, Sathy Mani Road NH-209,<br />Vazhiyampalayam, Saravanampatti, Coimbatore,<br />Tamil Nadu<br />641035</p>
                            <div className="flex space-x-7">
                                <i className="bi bi-linkedin text-2xl"></i>
                                <i className="bi bi-youtube text-2xl"></i>
                                <i className="bi bi-instagram text-2xl"></i>
                                <i className="bi bi-twitter text-2xl"></i>
                            </div>
                        </div>
                    </div>
                    <div className="w-3/5 flex justify-between pl-20">
                        <div>
                            <p className="font-bold mb-10">Products</p>
                            <ul className="space-y-3">
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-bold mb-10">Resources</p>
                            <ul className="space-y-3">
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-bold mb-10">Company</p>
                            <ul className="space-y-3">
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-bold mb-10">Support</p>
                            <ul className="space-y-3">
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                                <li><p className="text-xs">Product</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="my-10 space-y-5 ">
                    <hr className="border-1 border-black" />
                    <p className="text-sm">&copy; {new Date().getFullYear()} SNS iHub Workplace. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;