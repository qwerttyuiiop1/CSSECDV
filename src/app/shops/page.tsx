"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ShopCard, { Category, Shop } from "@/components/ShopCard/ShopCard";
import Dropdown, { DropdownItem } from "@/components/Dropdown/Dropdown";

const dropdownOptions: DropdownItem[] = [
  { id: 0, label: "Recommended" },
  { id: 1, label: "Most Popular" },
  { id: 2, label: "Cheapest" },
  { id: 3, label: "Newest" },
];

export const shops: Shop[] = [
  {
    id: 1,
    src: "https://images.macrumors.com/t/idlrs_bvpmrXXsR7jhkKiPFbr7A=/400x400/smart/article-new/2022/01/iOS-App-Store-General-Feature-JoeBlue.jpg",
    shopName: "App Store",
    availableVouchers: [100, 200, 300],
    category: Category.EL,
  },
  {
    id: 2,
    src: "https://awards.brandingforum.org/wp-content/uploads/2017/11/BENCH-logo.jpg",
    shopName: "Bench",
    availableVouchers: [100, 200, 300],
    category: Category.BF,
  },
  {
    id: 3,
    src: "https://cdn.lovesavingsgroup.com/logos/fully-booked.jpg",
    shopName: "Fully Booked",
    availableVouchers: [50, 150],
    category: Category.HB,
  },
  {
    id: 4,
    src: "data:image/png;base64,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",
    shopName: "Grab Car",
    availableVouchers: [100, 200, 300],
    category: Category.LS,
  },
  {
    id: 5,
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEUAsU////8ArD4ArkUArUEAr0oAr0gArUOb2bAAqztZxH+g2LEAsEgMtVZSwnuu4L/M7NcmuWJKwHR0yY6F0Z9lyInQ7tvx+/a75sul3bjw+vTh9OjZ8eJuyo4ftVpMwHaT1qrF6dF7zpc1umeL1KQ8vGzg9Oe95sx/0Jwkt1+t4L7p+O9ixYNqyYukqqCKAAATKUlEQVR4nO1diZbqqhKNTBE1Tq3GuR3bsf//9x6hSCAJaNJH+7zzHnutez2tFmFDUVQVg0Hg4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4VEZRABnL/+DWJ+m02kTk+Sl979IkQ4aAkvEk5eY/+3qvAHAcPK7DCmToPRXHvbLDBlGODqOd+fzbtUdBASF7M1P/FWGDHXG12Xc0JhPZndM3kryFxmGZNdv2ND/QG80cb/GkEQzKz1Am4bvevAvMcT0+oBfgg1606N/hyHfmWTmk9O13bxOt7khuVi/59m/wZAFevzdZvcIIeE/heI/hKLhJvus+57J4xcY4mHWVb0hD7HghmkUBThEJMSYhPfTv82QfKf8ZpRgwlvt/g3+jhfb9jfjgiTd/MMM0Vnx60eE8e6pZGIWzSMX/dr+VxmSD0Vkxxm/L+x2dHEOMTkeX/5wiTczZF1lPgc4HEzs/OSTN+G7Jv33MqRr1UmUZdoKjJfLr1uO4/z+U9+NMhyGIWYOJbcyFL4/xk6RGkBfQDCkaJp1V291IRwhxFFwXM2WGcdPVxWZ8M87lFKcGOHCZyGiw91mNp1tzi0RxVtaKcdwQkDm+DE6HA67VkRI508Ikg1wCihJNXRy50Q3HWXiaR/qM7ulwfwymn7NZTm3bfOTG9rM+HFmDu3b9F72cA2G8ZiL8rpXQybenin5cVdC2Y3GnnFFYt7i5VZmaH11MQzpJq/MjXgWkVRuZ7Fcs6Dg4WqG/Y5Qzc28JHIa8h9y5OCunEPUg6KmyDHWSDC1MWS4XaYg/IZIlr6KbR82Gs18yJkyxG3O0Mgu0r+QnxCkYEcnPFRe6eGBIUPDeYkhaTk4nMKARW7LPB+a9U0ZCh9q75itBDY/MbIIunDAlEEdPYweaKl7UVNXIF72+/3UUZ+igHSNzybTWbM97RvNcTAeBQy3JECG+3/r95rN2UmbucakaMSeg15UdRTTa81W4r304dvdBUmQwW4rVIoHZJVVdXNEKQaHrMYz/TDJcEEDnsVv21XElQgeztKGuUV1KYYQ8a7Zp3xd1Iz/sgpdIySCECFNBcUQRW0ckLQ3vlpcRCjhvvXd2mMRsfBhGqloignDeUB56i/21kl59Hj/7q6TKAftFEfxpZpVlEZri5Qd3dcTT8fu4oJCNJ6CQV02B4jiAN9VZXc85MPM9i+uInLhLfXXKB2LCcMB41v1pYHg931KDepyEyHM1XBY1DM39CilxnivlLWeNKh4Yyrs38G0N/119tkiCvk4bzsWY46ZUtUhzRi2MFcOR1s4+Zu8/TpdCPpU/6w1kDDM9kQp66VeFyLo+B7H+/x8eMMBAlYT4cmWM1sTMU1Cd93UvEiPM5QarW/E72X7vOH4Au9+1HGOiXz6lnBZw0nNLgRdm3D8WahNi4XQdEuCj6W6CsRiQELzNBXFiGFlmD4J6tlktiFTzkmdfiBS1Q8hqNSonlut6hgwTSKWLbXkQQR/UoP8ctvbasO/ZxR6JErbCwZK4xhS/a2vSV+niURzQZvOagxFKiW6IcSHZSUlLugq7TBWddjeA875erccMwK90MXrtKorluR9UHhXOhsHGGbLttI5Aoo+DGmq8dMuSayocGvVGyeuercGQWj9iMgyymHZYDu143QRY1gOmxtSbOKh8maZiB2g5aacKxuzyzxdxrvQIBMOljOGDlHzxJ0wRXCyRqkVCpkyQWeM5Wuz8khkoPqIyOKXxWFIrWNIQkwrEHRtCGj4zXR3lAGL0rBlYNaIUaD9jUFynAiqeWeEkFLRQ87PThOdQXhIXuaVDQaTgnMOxU6L6p0ODTvDyOz/xtqsEBjSKYIWb1zy45sGshdvahJOHqvmlh5Pp/xxoS4qNO8RJl9dUWqZofTiFwhq1Cvm7B8yBJd9gcBYbXI1gtE3VF24KuqUyprcIT2UDA7QhyUih4b6qFhVRR0TqbCzqssL+AAFuxg+0lImZXsIWiHXpuwMfYRSy1qqrjQ3JwLDdR2EMv4SxmcIpa8sxhJU5kzuUOWKDLOqfFkZBsGwjH0PGIKTcIZYoJ97IrRzT43QliWcbkHncfncFYPaf2I1gVhXR8CgiQfJr1Sd12AcxhzSF/1yy5WnCQrjbk/BOq2Q1MS8cQOV+CByDMxtThYHRQDjvwmlVh+Ico6nVreMypk1JmCeBxUHIgXvuAON/lVqususXcQ6Yyg1bYhkdLHLtSlMkHukutLyYBAeQ/P0SMKwzxHkClwaSEClEbRsxU5UOZpBCB5hse1s43BQZCi74SP/QPlN5fOcbXUBFT8gaWqmSDCMWTiWYjF17BwAg3+HdrCWagOY87uKdI7FLKDFll6A4Tp4wFAqXczA2bUm52DCbCNJapswHKbuz56hk9VSkq3UFiQt3KbqnA/WronBqBXFbAxVH0bPGRKYR4rNJgHTlGLYFww3RAUjYyzmGOtADHvAcFSLYerMgAYU7bpNSyOwaZ3nDENovmEFhoMJUumQJmJDh6WEutZlCE9qUJgYSyH+5TrTADtAIaHDnzJsULB61nWAYh9GIfiPWx7guaPf4YHKeB8qe6ZQmR2GGelUNGM4DHGo/qeWFKQ2LdAjhmBpIghyra2dZ0hSr+1GYLRZwzgY1kd44K5yoKdCXw4q8ChPAyrbJ5LoljxiSGL4aKa++pwhgUEowjcKvWqRgU5goEOVHVMVAgkDBkblgTcEM8qGSKJihn/AUE0TKptoM4wFhsp7H+O0yW0icmYRPrRsvsjyDQfWSj3VstPMSTGUJR/Bm77TRwzB6k2V22lTqJIthWfT/ZpID+Ja7nhweGZEdsW8RpSvMkJ7BoNH2CrH92QzfymrGwSPGELYOUfQl7ZgzsZQ6A+6rVRep+SVUXDKjxB9WFXfASW55EzlN8/WyUjtZFhB1Joo8yNLA601xCA0K5doYxhQ0YpTwpegjQUJMMwLlTU411lP1GtPagnpallb45DI+UKgRImte8QQqdAWBlVJLyi1MGwx2cYdBk2+zTeLSqWOQ/i0Br/c+qGKr2/F9cOQ9dLvRNkDHjHsQNIhYiq3nUtJUPTZDUsMhQGQPdkMlUWYYF0mVf7AkkN/WG2tGwT6LhaP3kKFGstVB8n1c9HamK/T5aVzCMkjme54qKUQB0xT+9WY7LlcNaIs5CLA/CZFhkIrmWoWiqHn428lg/lQJbTWKjnZqrl2oSajRYcivTOxvxkfL5fBcDf7St9qI5W0lVnHhwzVJPTJwlR6eThGUTS4N5M3ygyTiRiCrj5PFwQat83nOoqOozR/OsbgCC7qLiOmevpFKcoWxMo4cDVpQsT3kKEKWmKhBzdLUUWG+0MyaaoM3QGlue0CdkQpa/0NIRgis8b8EuKovB8KKtslnTUkGUBFnjAElVsiyizLwAWGRK2YqdTyirC1pV2+CQROydJkbZB05fyDU3S07RHeEEZUmki14GOGaoJuLAnjpWX52x4XGAKYaumdqEVxb8ByjblKxNXwZzRU68jdAAytm/nlsMmZYMZBhzKv5wnDgMLq321AMG3nlt7unBb90rQaymb3OCNrc3lmcucs/fCHm5b0ZqjeGuEQRavmabJcLrfTTYsijHlLkc7mqacM0/B5QzAh3fZ2MZ/f+rNvilDg6MM0UyHapSs44u/r5HabL6fnZIF0qBT38KMNGUmF02XZZIVFzBU4JHJRnoi4CQXntFO1u/SMYaCmbjG8D0GywgKL/AR1zmKkORgGOH1Qv4WIrAJPVnT4MDUP7Z/vw2aRseehf+hGLCk/pJdxU9uKqy7/KcOA7WNd3jAIRWXZ5SOZIUuWJgPF2cNu13HUIRzhoKVHzR9tNKcFkxDPb0JHcm+tjPKfMwxYYNrRpDhF2c0wdfHTOmgZifEf7qR/sld/GpjhegWGwqLatzc9Yhgg1xakxiT6882fhDZdxW/3+fYDhp+PGYpGsx3gOKZ+qQw+JgXbwfjBVonF/TXbTkPSmpbLX26i4t5A3Oxvt5M9PoiX/gNHkdDDV76wmfB2vxOpHf5MXsrrnZjsin7CtuvablcflJD9uTeZA894sW1+B7YDQVguYwQMXh4Ao/WuB8vx8aL3zRIPTUqx5Fn2I6MMBaveJJZCybGrP9h8aUWyo1SQEm4vJYjgP2+8pDwarYU9rX4KTslEDL3/6JyHh4fH/xeoxt+uyntAu40YUDsd9Y+A6q3jnuE/Cs8wB2yclHCj+mLrr8AzzMEz9Az/CjzDHDxDz/Cv4KcMA9xx4b/MNfopw9rHFv8afsyw7nNYCLu+a1wHQDs/kMEgo7OJv8KQoc5wNNtOBLaz0ZBVyUUzEh7P7RPIHD5pJRkUdDe9fiLSXkVK4hcYhqx4U1Z/x54sWmK82uZXCiaj4HESm5JgtMxJrORVDG9niAPrTVnX4gUCORlmXe2Zrh+0C1lPSwK3O3o7Q5qu5ZexQa7n8bNLZubqRorsN46dyJsZ4ov7LoDGbWBd28utLBcRH61dj/flOyMAC8beydBY6beifBoryA4yuWDb60nu7u8v+BsZ6pukXCifx8LdZzLlKxyy+46s6OnjA69miB+0bIp7QVGZ++xbhl1xAfhJo+htaS9m+OAoooHiRvgqMp/5O07WzyXewxAVjEy/+d1qfW8KU+Mtv6uisFI9aa5arfFmm383znU8LximvpQ5WBbeX8yQ5OKQeIST7aeUYUTOObvXNDf/5KeJA1MyBK1y+/J6yCUzP5NUhrdKGwBfyzAyi56Zq/oY5cgbJdEcjTB3r9LB/MzQbZJrLnOrMi3ds/BShsTcRXcvmD9kziL6tGEu/NwVNooQcxbZZgVik3mr8BwW5EfKS6MnsztapVk6Nyfod40m/yjPI6aZzc6BE0Plu+Xbsjo5ijUZOqC+aTTtyDKvE2Pn00hVjBnTmm23HTam15mSoYY22LYg0txgeUkWYwr9hfSWn4l1XxLXZiA9VwTnISVudhm9GTk1wcZgsBwAT6psbtJ+DUP1aP2O/eiXeVAx7XejKvZgMCqVaiip9dRieq7k5QyZvpzKtcXa6EQ4g2wonGtnvb7gT50mzPboNxpfDhlmdOILGYZaecaO2Nx4MgwqrOOskWNDIdX29EQKhTgPUBrTyQsZIu1nuAvNvgI7DYkeZc6bh0lmbeGUk1Eh53F7pL2oFzLUw8N9PFEboxvKt4r1xgFgmNUWPDejVZwyRqVfOQ4Lf1trqweV/A7PWsVyU4NCqCN56XJkF1Na7j5IwX4YWzxmqDXQfYLaKEzOMDz78+pM4TDthF6Sv3W/u1vl1Vl92Jmvzbr7JgOsJ/0gz9B9H5DRH/LwNsoccvcByhdn9VXqVhvxnfNgI9MMozxDd7//IcPndzZX9Uup1lKX4c85dp08w7ZbS7VjJ6d8HYO6r1VLDw41nE6Bg+HDL2q/211brK1GYRy6rZPRKnJG0RGz+/rGosxrGOoowa092g2Fu7u0xrlnGMMNLZThni0M7+P56aDKDHVtb+75MJsdFoX50F0TPYdCq2B92sN6bUQC7ZhWuKazMkOjbV2+hpGoAg8s1LV1WgSt/TDuDGvlNE/arlc4sF5dS/UXm46BaHwFKtfR3rr1kqEgN8FcwfPWjqrLWzeGYYXbTapbGm2hXXcZaBdTmTgz++iYRI303be6ra9RKKUEfnv2jR8xDJB+8si+0mAkAVTra7fNcZEjM4L89DnarbZH2kYEHFc4hlidoeESW6dOM7uQTg7G9GEfvUx3ezr9dYxc4of1whAt49L9nzE08ye29IKZxk3tihn23yy1TS/UlWxSPTYzXpeycnMjAV3l+pYa2URD/S1hvllZnZMxaS9LK4XcyE/Gmd03IpRGvC66iNw4O1jpSucaDM3EWWOZX/DFgZmI18f0zI5v3PLXqTNsLgfogN7IYyTdlGPRCY2GTG3TyxgWli1GJEx1EZNcHt5s2vyyxQaTTAblrqI3bUYu9dy4BunPKFDMv83lg2q3ctdhSPMrnfFsSJNzy+zYzi/XmiY83yFC5jOR4exY+JmB3Onz3FKAsFv3IJHBg0M+311hqqjJsLA0k+D29VW6+KCZ00VcOiI7Xy5vxVWk/C2JRuyQynx9LYoyFS8SrrdCWlwqs6EY9PDyhooSvopXsVp/aCEPe7r4TxkG4YNtCoDyben8abOUL5F/3iy3yncm1typED7YVZFgaXEUsxtvXJW13JLPe09kKp94qr3b5HHr2m+s549+i6/RD22VRYeHMtW3S9bfMYRcPzjSyF9GkJNpuTbHuC7dEmbtaLvUBnCocefAD3Z9MevpeoErdeebQsdGqmnkzIlQYj2RL4LCdZ1fYDR+Hqb6zj0SlH/kZt4MHlpvzA4lKxXPHm1rSzb77crDvjeoeWkEzbKGdaQwP262mRbN+5sjfxqLYj44aJm43xzyp33R4evRKWuZeDnrEuuofQeEq8ZRdOx2j2vESz9f5Zbh0fGzdbyQqjIBI0jIDO/HAebo1+hl+Mk51Z/K/DObtD08PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8/lvwHyWPNXrLyAfZAAAAAElFTkSuQmCC",
    shopName: "Grab Food",
    availableVouchers: [100, 200, 300],
    category: Category.FD,
  },
  {
    id: 6,
    src: "https://cdn.lovesavingsgroup.com/logos/lalamove.png",
    shopName: "Lalamove",
    availableVouchers: [100, 200, 300],
    category: Category.TR,
  },
  {
    id: 7,
    src: "https://lzd-img-global.slatic.net/g/tps/tfs/TB1PApewFT7gK0jSZFpXXaTkpXa-200-200.png",
    shopName: "Lazada",
    availableVouchers: [100, 200, 300],
    category: Category.OS,
  },
  {
    id: 8,
    src: "data:image/jpeg;base64,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",
    shopName: "National Bookstore",
    availableVouchers: [100, 200, 300],
    category: Category.HB,
  },
  {
    id: 9,
    src: "https://cdn.worldvectorlogo.com/logos/samsung-4.svg",
    shopName: "Samsung",
    availableVouchers: [100, 200, 300],
    category: Category.EL,
  },
  {
    id: 10,
    src: "https://seeklogo.com/images/S/shopee-logo-33D0F724BA-seeklogo.com.png",
    shopName: "Shopee",
    availableVouchers: [100, 200, 300],
    category: Category.OS,
  },
  {
    id: 11,
    src: "https://www.smsupermalls.com/data/uploads/2021/08/smsupermarket.png",
    shopName: "SM Supermarket",
    availableVouchers: [100, 200, 300],
    category: Category.FD,
  },
  {
    id: 12,
    src: "https://static.vecteezy.com/system/resources/previews/020/336/732/original/steam-logo-steam-icon-free-free-vector.jpg",
    shopName: "Steam",
    availableVouchers: [100, 200, 300],
    category: Category.GM,
  },
  {
    id: 13,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UNIQLO_logo.svg/2058px-UNIQLO_logo.svg.png",
    shopName: "Uniqlo",
    availableVouchers: [100, 200, 300],
    category: Category.BF,
  },
];

export default function Shops() {
  const [categoryCheckedItems, setCategoryCheckedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [shopCheckedItems, setShopCheckedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [selectedSortFilter, setSelectedSortFilter] =
    useState<DropdownItem | null>(dropdownOptions[0]);

  const handleCategoryCheckboxChange = (item: string) => {
    setShopCheckedItems({});
    setCategoryCheckedItems({
      ...categoryCheckedItems,
      [item]: !categoryCheckedItems[item],
    });
  };

  const handleShopCheckboxChange = (item: string) => {
    setCategoryCheckedItems({});
    setShopCheckedItems({
      ...shopCheckedItems,
      [item]: !shopCheckedItems[item],
    });
  };

  const handleSelectionChange = (item: DropdownItem | null) => {
    setSelectedSortFilter(item);
  };

  useEffect(() => {
    console.log(selectedSortFilter);
    const newFilteredShops = shops.filter((shop) => {
      const categoryPasses =
        Object.keys(categoryCheckedItems).length === 0 ||
        categoryCheckedItems[shop.category];
      const shopPasses =
        Object.keys(shopCheckedItems).length === 0 ||
        shopCheckedItems[shop.shopName];
      return categoryPasses && shopPasses;
    });

    if (
      Object.values(categoryCheckedItems).every((checked) => !checked) &&
      Object.values(shopCheckedItems).every((checked) => !checked)
    ) {
      setFilteredShops(shops);
    } else {
      setFilteredShops(newFilteredShops);
    }
  }, [categoryCheckedItems, selectedSortFilter, shopCheckedItems]);

  return (
    <div className={styles.main_container}>
      <div className={styles.horizontal_container}>
        <div className={styles.filter_container}>
          <h1>Search Filter</h1>
          <h4 className={styles.header_text}>Categories</h4>
          <div className={styles.categories_container}>
            {Object.values(Category).map((item, index) => (
              <label className={styles.checkbox_label} key={index}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onChange={() => handleCategoryCheckboxChange(item)}
                  checked={categoryCheckedItems[item] || false}
                />
                <h4 className={styles.filter_item_name}>{item}</h4>
              </label>
            ))}
          </div>

          <h4 className={styles.header_text}>Shop</h4>
          <div className={styles.shopfilters_container}>
            {shops.map((shop, index) => (
              <label className={styles.checkbox_label} key={index}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onChange={() => handleShopCheckboxChange(shop.shopName)}
                  checked={shopCheckedItems[shop.shopName] || false}
                />
                <h4 className={styles.filter_item_name}>{shop.shopName}</h4>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.shop_container}>
          <div className={styles.shop_header_container}>
            <div className={styles.shop_info_container}>
              <h1 className={styles.shop_header}>SHOP</h1>
              <h4 className={styles.shop_num}>Showing 1-12 of 105</h4>
            </div>
            <div className={styles.sort_container}>
              <div
                style={{
                  height: "fitContent",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3 style={{ marginRight: "0.6rem" }}>Sort By</h3>
                <Dropdown
                  options={dropdownOptions}
                  onSelectionChange={handleSelectionChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.shops_container}>
            {filteredShops.map((shop, index) => (
              <ShopCard
				key={index}
                id={shop.id}
                src={shop.src}
                shopName={shop.shopName}
                availableVouchers={shop.availableVouchers}
                category={shop.category}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom_container}>
        <button className={styles.page_button}>
          <h1>&lt;</h1>
        </button>

        <h1 className={styles.page_num}>1</h1>

        <button className={styles.page_button}>
          <h1>&gt;</h1>
        </button>
      </div>
    </div>
  );
}
