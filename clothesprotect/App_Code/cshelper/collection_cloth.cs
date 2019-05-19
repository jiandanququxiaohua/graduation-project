using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// collection_cloth 的摘要说明
/// </summary>
public class collection_cloth
{
    DbHelperV2 dbhelperv2 = new DbHelperV2();
    public collection_cloth()
    {
        //
        // TODO: 在此处添加构造函数逻辑
        //
    }

    public Result collection_get(int userId)
    {
        var result = new Result<List<Collection>>();
        //此处需优化，参数化处理
        var sqltextFomat = "select * from [clothes].[dbo].[collection] where userId='{0}'";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, userId));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            result.Message = "没有收藏记录！";
            result.IsTrue = false;
            result.Data = new List<Collection>();
            return result;
        }
        var collections = dt.ToCollections();
        result.Code = 200;
        result.Message = "成功！";
        result.Data = collections;
        result.IsTrue = true;
        return result;
    }

    public Result collection_delete(int id)
    {
        var result = new Result<List<Collection>>();
        //此处需优化，参数化处理
        var sqltextFomat = "delete from [clothes].[dbo].[collection] where id='{0}'";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, id));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            result.Message = "删除失败！";
            result.IsTrue = false;
            return result;
        }
        var collections = dt.ToCollections();
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;

    }

    public Result collection_update(string clothId, int id)
    {
        var result = new Result<List<Collection>>();
        //此处需优化，参数化处理
        var sqltextFomat = "update [clothes].[dbo].[collection] set clothId='{0}' where id='{1}'";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, clothId, id));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            result.Message = "更新失败！";
            result.IsTrue = false;
            result.Data = new List<Collection>();
            return result;
        }
        var collections = dt.ToCollections();
        result.Code = 200;
        result.Message = "成功！";
        result.Data = collections;
        result.IsTrue = true;
        return result;

    }

    public Result collection_insert(string clothId, string startTime, string endTime)
    {
        var result = new Result<List<Collection>>();
        //此处需优化，参数化处理
        var sqltextFomat = "insert into [clothes].[dbo].[collection] (clothId, startTime, endTime) values ('{0}', '{1}', '{2}')";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, clothId, startTime, endTime));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            result.Message = "插入失败！";
            result.IsTrue = false;
            result.Data = new List<Collection>();
            return result;
        }
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;

    }
}
