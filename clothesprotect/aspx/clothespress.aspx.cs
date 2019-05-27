using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class clothespress : System.Web.UI.Page
{

    //type=1  get; type=2 add;type=3 edit;type=4 delete
    int[] _types = new int[] { 1, 2, 3, 4 };
    protected void Page_Load(object sender, EventArgs e)
    {

        //type=1  get; type=2 add;type=3 edit
        var type = Request.Params.Get("type") ?? "";
        var inttype = 0;
        int.TryParse(type, out inttype);
        if (!_types.Contains(inttype))
        {
            //type值不合法
            Response.Write(JsonConvert.SerializeObject(new Result { Code = 500, IsTrue = false, Message = "type只能赋值1、2、3、4" }));
            return;
        }
        //post取参
        //var cc=Request.Params.Get("name") ?? "";
        try
        {
            //查找
            if (inttype == 1)
            {
                //衣服类型id
                var typeid = Request.Params.Get("clothTypeId") ?? "";
                //当前用户id
                var userId = Request.Params.Get("userId") ?? "";
                //衣服名称
                var name = Request.Params.Get("name") ?? "";

                var id = Request.Params.Get("id") ?? "";

                Response.Write(JsonConvert.SerializeObject(ClothHelper.GetInfoByTypeOrName(typeid, name,userId, id)));
                return;
            }
            //编辑
            if (inttype == 3)
            {

                //类型主键id
                var id = Request.Params.Get("id") ?? "";

                var intid = Convert.ToInt32(id);
                var model = new Cloth();
                model.brand = Request.Params.Get("brand") ?? "";
                model.clothName = Request.Params.Get("clothName") ?? "";
                model.clothTypeId = Request.Params.Get("clothTypeId") ?? "";
                model.color = Request.Params.Get("color") ?? "";
                model.createTime = Request.Params.Get("createTime") ?? "";
                model.endTime = Request.Params.Get("endTime") ?? "";
                model.fabric = Request.Params.Get("fabric") ?? "";
                model.imgUrl = Request.Params.Get("imgUrl") ?? "";
                model.price = Request.Params.Get("price") ?? "";
                model.season = Request.Params.Get("season") ?? "";
                model.userId = Request.Params.Get("userId") ?? "";

                Response.Write(JsonConvert.SerializeObject(ClothHelper.EditCloth(model, intid)));
                return;
            }
            //新增
            if (inttype == 2)
            {
              
                var model = new Cloth();
                model.brand = Request.Params.Get("brand") ?? "";
                model.clothName = Request.Params.Get("clothName") ?? "";
                model.clothTypeId = Request.Params.Get("clothTypeId") ?? "";
                model.color = Request.Params.Get("color") ?? "";
                model.createTime = Request.Params.Get("createTime") ?? "";
                model.endTime = Request.Params.Get("endTime") ?? "";
                model.fabric = Request.Params.Get("fabric") ?? "";
                model.imgUrl = Request.Params.Get("imgUrl") ?? "";
                model.price = Request.Params.Get("price") ?? "";
                model.season = Request.Params.Get("season") ?? "";
                model.userId = Request.Params.Get("userId") ?? "";
                Response.Write(JsonConvert.SerializeObject(ClothHelper.AddCloth(model)));
                return;
            }
            //删除
            if (inttype == 4)
            {
                //类型主键id
                var id = Request.Params.Get("id") ?? "";
                var intid = Convert.ToInt32(id);
                Response.Write(JsonConvert.SerializeObject(ClothHelper.DeleteClothById(intid)));
                return;
            }
        }
        catch (Exception ex)
        {
            Response.Write(JsonConvert.SerializeObject(new Result { Code = 500, IsTrue = false, Message = ex.ToString() }));
        }
    }
}