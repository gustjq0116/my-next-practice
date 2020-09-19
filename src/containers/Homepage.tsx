import Link from "next/link";

export function Homepage()
{
    return <div>
                <h1>
                    Hello
                </h1>
                <div>
                    <Link href="/people" shallow>
                        <a>
                            To People
                        </a>
                    </Link>
                </div>
                <div>
                    <Link href="/vehicles" shallow>
                        <a>
                            To Vehicles
                        </a>
                    </Link>
                </div>
                
            </div>
}