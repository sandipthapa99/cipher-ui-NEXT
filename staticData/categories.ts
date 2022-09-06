import { TypeOf } from "yup";

export interface CategoriesValuesData {
    id: number;
    title: string;
    merchant: string;
}
export const CategoriesData: CategoriesValuesData[] = [
    {
        id: 1,
        title: "Gardening",
        merchant: "Gardeners",
    },
    {
        id: 2,
        title: "Accounting",
        merchant: "Accounts",
    },
    {
        id: 3,
        title: "Cleaning",
        merchant: "Cleaners",
    },
    {
        id: 4,
        title: "Beauty",
        merchant: "Beautician",
    },
    {
        id: 5,
        title: "Cooking",
        merchant: "Cooks",
    },
    {
        id: 6,
        title: "Business",
        merchant: "Business",
    },
];

export const NestedCategoriesData = [
    {
        id: 36,
        is_active: true,
        name: "Medical",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM96 432H64c-8.801 0-16-7.201-16-16V96c0-8.801 7.199-16 16-16h32V432zM432 432h-288v-352h288V432zM528 416c0 8.799-7.199 16-16 16h-32v-352h32c8.801 0 16 7.199 16 16V416zM208 288H256v48C256 344.8 263.2 352 272 352h32c8.836 0 16-7.164 16-16V288h48C376.8 288 384 280.8 384 272v-32C384 231.2 376.8 224 368 224H320V176C320 167.2 312.8 160 304 160h-32C263.2 160 256 167.2 256 176V224H208C199.2 224 192 231.2 192 240v32C192 280.8 199.2 288 208 288z"/></svg>',
        level: 0,
        task_count: 0,
        child: [
            {
                id: 38,
                name: "General Physician",
                level: 1,
                is_active: true,
            },
            {
                id: 37,
                name: "Dentist",
                level: 1,
                is_active: true,
            },
        ],
    },
    {
        id: 36,
        is_active: true,
        name: "Medical",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM96 432H64c-8.801 0-16-7.201-16-16V96c0-8.801 7.199-16 16-16h32V432zM432 432h-288v-352h288V432zM528 416c0 8.799-7.199 16-16 16h-32v-352h32c8.801 0 16 7.199 16 16V416zM208 288H256v48C256 344.8 263.2 352 272 352h32c8.836 0 16-7.164 16-16V288h48C376.8 288 384 280.8 384 272v-32C384 231.2 376.8 224 368 224H320V176C320 167.2 312.8 160 304 160h-32C263.2 160 256 167.2 256 176V224H208C199.2 224 192 231.2 192 240v32C192 280.8 199.2 288 208 288z"/></svg>',
        level: 0,
        task_count: 0,
        child: [
            {
                id: 38,
                name: "General Physician",
                level: 1,
                is_active: true,
            },
            {
                id: 37,
                name: "Dentist",
                level: 1,
                is_active: true,
            },
        ],
    },
    {
        id: 36,
        is_active: true,
        name: "Medical",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM96 432H64c-8.801 0-16-7.201-16-16V96c0-8.801 7.199-16 16-16h32V432zM432 432h-288v-352h288V432zM528 416c0 8.799-7.199 16-16 16h-32v-352h32c8.801 0 16 7.199 16 16V416zM208 288H256v48C256 344.8 263.2 352 272 352h32c8.836 0 16-7.164 16-16V288h48C376.8 288 384 280.8 384 272v-32C384 231.2 376.8 224 368 224H320V176C320 167.2 312.8 160 304 160h-32C263.2 160 256 167.2 256 176V224H208C199.2 224 192 231.2 192 240v32C192 280.8 199.2 288 208 288z"/></svg>',
        level: 0,
        task_count: 0,
        child: [
            {
                id: 38,
                name: "General Physician",
                level: 1,
                is_active: true,
            },
            {
                id: 37,
                name: "Dentist",
                level: 1,
                is_active: true,
            },
        ],
    },
    {
        id: 36,
        is_active: true,
        name: "Medical",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM96 432H64c-8.801 0-16-7.201-16-16V96c0-8.801 7.199-16 16-16h32V432zM432 432h-288v-352h288V432zM528 416c0 8.799-7.199 16-16 16h-32v-352h32c8.801 0 16 7.199 16 16V416zM208 288H256v48C256 344.8 263.2 352 272 352h32c8.836 0 16-7.164 16-16V288h48C376.8 288 384 280.8 384 272v-32C384 231.2 376.8 224 368 224H320V176C320 167.2 312.8 160 304 160h-32C263.2 160 256 167.2 256 176V224H208C199.2 224 192 231.2 192 240v32C192 280.8 199.2 288 208 288z"/></svg>',
        level: 0,
        task_count: 0,
        child: [
            {
                id: 38,
                name: "General Physician",
                level: 1,
                is_active: true,
            },
            {
                id: 37,
                name: "Dentist",
                level: 1,
                is_active: true,
            },
        ],
    },
    {
        id: 36,
        is_active: true,
        name: "Medical",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM96 432H64c-8.801 0-16-7.201-16-16V96c0-8.801 7.199-16 16-16h32V432zM432 432h-288v-352h288V432zM528 416c0 8.799-7.199 16-16 16h-32v-352h32c8.801 0 16 7.199 16 16V416zM208 288H256v48C256 344.8 263.2 352 272 352h32c8.836 0 16-7.164 16-16V288h48C376.8 288 384 280.8 384 272v-32C384 231.2 376.8 224 368 224H320V176C320 167.2 312.8 160 304 160h-32C263.2 160 256 167.2 256 176V224H208C199.2 224 192 231.2 192 240v32C192 280.8 199.2 288 208 288z"/></svg>',
        level: 0,
        task_count: 0,
        child: [
            {
                id: 38,
                name: "General Physician",
                level: 1,
                is_active: true,
            },
            {
                id: 37,
                name: "Dentist",
                level: 1,
                is_active: true,
            },
        ],
    },
    {
        id: 36,
        is_active: true,
        name: "Medical",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM96 432H64c-8.801 0-16-7.201-16-16V96c0-8.801 7.199-16 16-16h32V432zM432 432h-288v-352h288V432zM528 416c0 8.799-7.199 16-16 16h-32v-352h32c8.801 0 16 7.199 16 16V416zM208 288H256v48C256 344.8 263.2 352 272 352h32c8.836 0 16-7.164 16-16V288h48C376.8 288 384 280.8 384 272v-32C384 231.2 376.8 224 368 224H320V176C320 167.2 312.8 160 304 160h-32C263.2 160 256 167.2 256 176V224H208C199.2 224 192 231.2 192 240v32C192 280.8 199.2 288 208 288z"/></svg>',
        level: 0,
        task_count: 0,
        child: [
            {
                id: 38,
                name: "General Physician",
                level: 1,
                is_active: true,
            },
            {
                id: 37,
                name: "Dentist",
                level: 1,
                is_active: true,
            },
        ],
    },
    {
        id: 36,
        is_active: true,
        name: "Medical",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM96 432H64c-8.801 0-16-7.201-16-16V96c0-8.801 7.199-16 16-16h32V432zM432 432h-288v-352h288V432zM528 416c0 8.799-7.199 16-16 16h-32v-352h32c8.801 0 16 7.199 16 16V416zM208 288H256v48C256 344.8 263.2 352 272 352h32c8.836 0 16-7.164 16-16V288h48C376.8 288 384 280.8 384 272v-32C384 231.2 376.8 224 368 224H320V176C320 167.2 312.8 160 304 160h-32C263.2 160 256 167.2 256 176V224H208C199.2 224 192 231.2 192 240v32C192 280.8 199.2 288 208 288z"/></svg>',
        level: 0,
        task_count: 0,
        child: [
            {
                id: 38,
                name: "General Physician",
                level: 1,
                is_active: true,
            },
            {
                id: 37,
                name: "Dentist",
                level: 1,
                is_active: true,
            },
        ],
    },
    {
        id: 35,
        is_active: true,
        name: "Saloon",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M472.6 442.4L312.4 308.2L349.8 276.9L503.4 405.6C513.6 414.1 514.9 429.3 506.4 439.4C497.9 449.6 482.7 450.9 472.6 442.4H472.6zM112 0C173.9 0 224 50.14 224 112C224 129.9 219.8 146.8 212.4 161.8L287.5 224.7L472.6 69.6C482.7 61.09 497.9 62.43 506.4 72.59C514.9 82.75 513.6 97.88 503.4 106.4L212.4 350.2C219.8 365.2 224 382.1 224 400C224 461.9 173.9 512 112 512C50.14 512 0 461.9 0 400C0 338.1 50.14 288 112 288C138.6 288 163.1 297.3 182.3 312.8L250.1 256L182.3 199.2C163.1 214.7 138.6 224 112 224C50.14 224 .0003 173.9 .0003 112C.0003 50.14 50.14 .0003 112 .0003L112 0zM48 112C48 147.3 76.65 176 112 176C147.3 176 176 147.3 176 112C176 76.65 147.3 48 112 48C76.65 48 48 76.65 48 112zM112 336C76.65 336 48 364.7 48 400C48 435.3 76.65 464 112 464C147.3 464 176 435.3 176 400C176 364.7 147.3 336 112 336z"/></svg>',
        level: 0,
        task_count: 0,
        child: [
            {
                id: 40,
                name: "Women Hair Cut",
                level: 1,
                is_active: true,
            },
            {
                id: 39,
                name: "Men Hair Cut",
                level: 1,
                is_active: true,
                child: [
                    {
                        id: 44,
                        name: "haha",
                        level: 2,
                        is_active: false,
                    },
                ],
            },
        ],
    },
    {
        id: 34,
        is_active: true,
        name: "Car Servicing",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M627.4 162.9C639.1 169.2 643.4 183.8 637.1 195.4C630.8 207.1 616.2 211.4 604.6 205.1L319.1 51.28L35.41 205.1C23.75 211.4 9.19 207.1 2.887 195.4C-3.416 183.8 .9271 169.2 12.59 162.9L308.6 2.887C315.7-.9623 324.3-.9623 331.4 2.887L627.4 162.9zM200 360C200 346.7 210.7 336 224 336C237.3 336 248 346.7 248 360C248 373.3 237.3 384 224 384C210.7 384 200 373.3 200 360zM440 360C440 373.3 429.3 384 416 384C402.7 384 392 373.3 392 360C392 346.7 402.7 336 416 336C429.3 336 440 346.7 440 360zM182 207.8C192.3 179.1 219.4 160 249.8 160H390.2C420.6 160 447.7 179.1 457.1 207.8L486.6 287.9C486.8 288.4 486.9 288.9 487.1 289.3C511.8 306.7 528 335.5 528 368V488C528 501.3 517.3 512 504 512C490.7 512 480 501.3 480 488V448H160V488C160 501.3 149.3 512 136 512C122.7 512 112 501.3 112 488V368C112 335.5 128.2 306.7 152.9 289.3C153.1 288.9 153.2 288.4 153.4 287.9L182 207.8zM249.8 208C239.7 208 230.6 214.4 227.2 223.9L210.1 272H429.9L412.8 223.9C409.4 214.4 400.3 208 390.2 208H249.8zM432 320H208C181.5 320 160 341.5 160 368V400H480V368C480 341.5 458.5 320 432 320z"/></svg>',
        level: 0,
        task_count: 0,
        child: [
            {
                id: 43,
                name: "Car  500 Model Servicing",
                level: 1,
                is_active: true,
            },
            {
                id: 42,
                name: "Car Special Wash",
                level: 1,
                is_active: true,
            },
            {
                id: 41,
                name: "Car Wash",
                level: 1,
                is_active: true,
            },
        ],
    },
    {
        id: 1,
        is_active: true,
        name: "Category 1",
        icon: "",
        level: 0,
        task_count: 0,
        child: [
            {
                id: 33,
                name: "Category 1 B",
                level: 1,
                is_active: true,
            },
            {
                id: 2,
                name: "Category 1 A",
                level: 1,
                is_active: true,
            },
        ],
    },
];

export type NestedCategoryType = typeof NestedCategoriesData;
export type ChildCategory = NestedCategoryType[0]["child"];
