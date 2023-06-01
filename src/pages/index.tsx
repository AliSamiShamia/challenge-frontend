import { useEffect, useState } from "react";
import { Button, Grid, } from "@mui/material";
//Utils
import authConfig from '../../@core/config/auth'
import { get } from "../../handler"

//Custom Components
import { Layout } from '../../@core/components/common/layout'
import BannerImage from "../../@core/components/common/coloredBanner";
import { useSession } from "next-auth/react";
import FilterList from "../../@core/components/news/filter";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ItemSpinner from "../../@core/components/common/itemSpinner";
import { Banner } from "../../@core/components/common/banner";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ImageDesign from "../../@core/components/news/design/design.image";
import TextDesign from "../../@core/components/news/design/design.text";

export default function Home() {



  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([] as any[]);
  const [queryString, setQueryString] = useState("");
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(false);

  const init = async () => {

    try {
      if (status != "loading") {
        setLoading(true);
        let res = await get(authConfig.home, session?.user?.token ?? null) as ResponseInterface;
        if (res && res.status_code == 200) {
          setLoading(false);
          let data = res.data
          const result = Object.keys(data).map((key) => data[key]);
          setItems(result);

        } else {
          setLoading(false);
        }
      }
    } catch (e) {
      setLoading(false);
      console.log(e);

    }
  }

  const previous = () => {
    let newPage = page - 1;
    setPage(newPage);
    submit(queryString);
  }

  const next = () => {
    let newPage = page + 1;
    setPage(newPage);
    submit(queryString);
  }



  const submit = async (url: string) => {
    try {
      setLoading(true)
      setQueryString(url);

      let res = await get(authConfig.home + `?page=${page}&${url}`, session?.user?.token);
      if (res && res.status_code == 200) {
        let data = res.data
        const result = Object.keys(data).map((key) => data[key]);
        setItems(result);
      }
      setLoading(false)
    } catch (e) {
      setLoading(false);
    }
  }

  useEffect(() => {
    init();

  }, [status]);


  return (
    <Layout page={'home'} head={"News"}>

      <BannerImage
        sx={{
          minHeight: { xl: "100% ", md: "100%", xs: "100%" },
        }}
      >
        <Banner setLoading={setLoading} />
        <Grid className='main' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Grid sx={{ width: "100%", maxWidth: { md: 'xl', xs: '100%' }, }} display={"flex"} justifyContent={"flex-end"}>

            <Button onClick={() => { setSearch(!search) }} endIcon={<FilterAltIcon />} variant={search ? 'contained' : 'outlined'}>
              Filter
            </Button>
          </Grid>
          <Grid container sx={{ pb: 20, maxWidth: { md: 'xl', xs: '100%' }, minHeight: 100, mb: 5, overflowY: 'scroll' }} display={"flex"} justifyContent={"cetner"} >
            {search ?
              <FilterList setSearch={setSearch} search={search} submit={submit} setQueryString={setQueryString} queryString={queryString} />
              : null}
            <Grid item md={12} xs={12}>
              {loading ? (
                <>
                  <Grid sx={{ height: "100%" }} display={'flex'} justifyContent={"center"} alignItems={"center"}>
                    <ItemSpinner loading={loading} />
                  </Grid>
                </>
              ) : (<>
                <Grid container display={"flex"} justifyContent={"center"} alignItems={"flex-start"}>

                  {items?.map((data: any) => {
                    return <Grid item md={6}>
                      <Grid container>
                        {data.map((item: OptionInterface, key: number) => {
                          return item?.image && item?.image?.url ?
                            <ImageDesign item={item} key={key} />
                            :
                            <TextDesign item={item} key={key} />
                        })
                        }
                      </Grid>
                    </Grid>
                  })}
                  {items.length > 0 ? (
                    <Grid sx={{ width: "100%", maxWidth: { md: 'lg', xs: '100%' }, }} display={"flex"} justifyContent={"space-between"}>
                      <Button onClick={() => { page >= 1 ? previous() : null }} endIcon={<FilterAltIcon />} variant={'contained'}>
                        Previous
                      </Button>
                      <Button onClick={() => { next() }} endIcon={<FilterAltIcon />} variant={'contained'}>
                        Next
                      </Button>
                    </Grid>) : null}
                </Grid>
              </>)}
            </Grid>

          </Grid>
        </Grid>
      </BannerImage>

    </Layout >

  )
}

Home.auth = true

